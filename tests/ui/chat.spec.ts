import { expect, test } from "@playwright/test";

for (const width of [320, 390, 1280]) {
  test(`Markdown replies render safely and fit at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const answer = [
      "### Experience",
      "Rajesh builds **healthcare software** and AI tools.",
      "- **Focus:** useful products\n- **Stack:** TypeScript and React",
      "### Education",
      "Graduated with an **8.73 OGPA**.",
      "[GitHub profile](https://github.com/rajeshravi2004)",
      "<img src=x onerror=alert(1)>\n<script>alert(1)</script>\n[Unsafe](javascript:alert%281%29)\n![Remote image](https://example.com/tracker.png)",
      "| Skill | Use |\n| --- | --- |\n| TypeScript | Web applications |",
      "```text\n" + "long-code-sample-".repeat(20) + "\n```",
    ].join("\n\n");
    await page.route("**/api/chat", (route) => route.fulfill({ json: { answer } }));
    await page.goto("/");
    const launcher = page.locator(".site-header").getByRole("button", { name: "Ask about me" });
    await expect(launcher).toBeVisible();
    await expect(launcher.locator("svg")).toBeVisible();
    const launcherBounds = await launcher.boundingBox();
    expect(launcherBounds!.x + launcherBounds!.width).toBeLessThanOrEqual(width);
    await page.emulateMedia({ reducedMotion: "reduce" });
    expect(await launcher.evaluate((el) => getComputedStyle(el, "::after").animationName)).toBe("none");
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.evaluate(() => { document.documentElement.dataset.motion = "full"; });
    expect(await launcher.evaluate((el) => getComputedStyle(el, "::after").animationName)).toBe("chat-invite-glow");
    await page.evaluate(() => { document.documentElement.dataset.motion = "paused"; });
    expect(await launcher.evaluate((el) => getComputedStyle(el, "::after").animationName)).toBe("none");
    await launcher.click();
    await page.getByRole("button", { name: "What does Rajesh build?" }).click();
    const reply = page.locator(".chat-markdown");
    await expect(reply.getByRole("heading", { name: "Experience" })).toBeVisible();
    await expect(reply.locator("strong").filter({ hasText: "healthcare software" })).toBeVisible();
    await expect(reply.locator("li")).toHaveCount(2);
    await expect(reply.getByRole("link", { name: "GitHub profile" })).toHaveAttribute("rel", "noopener noreferrer");
    await expect(reply.locator("script, img, a[href^='javascript:']")).toHaveCount(0);
    await expect(reply.locator("table")).toHaveCount(1);
    expect(await page.locator(".chat-messages").evaluate((el) => el.scrollWidth <= el.clientWidth)).toBe(true);
    for (const theme of ["dark", "light"]) {
      await page.evaluate((theme) => { document.documentElement.dataset.theme = theme; }, theme);
      await expect(reply).toHaveCSS("color", theme === "dark" ? "rgb(238, 243, 238)" : "rgb(16, 24, 40)");
      await page.locator(".chat-messages").evaluate((el) => { el.scrollTop = 0; });
      await page.screenshot({ path: `test-results/chat-markdown-${width}-${theme}.png` });
    }
  });
}

test("real API requires login, origin and a valid signed session", async ({ request }) => {
  expect((await request.get("/api/chat-admin/content")).status()).toBe(401);
  expect((await request.post("/api/chat-admin/session", { data: { password: "local-browser-test-password" }, headers: { Origin: "https://other.example" } })).status()).toBe(403);
  const response = await request.post("/api/chat-admin/session", { data: { password: "local-browser-test-password" }, headers: { Origin: "http://localhost:3108" } });
  expect(response.ok()).toBe(true);
  expect(response.headers()["set-cookie"]).toContain("HttpOnly");
  expect(response.headers()["set-cookie"]).toContain("Secure");
  const cookie = response.headers()["set-cookie"].split(";")[0];
  expect((await request.get("/api/chat-admin/session", { headers: { Cookie: cookie } })).status()).toBe(200);
  const page = await request.get("/rajesh-chat-update");
  expect(page.headers()["x-robots-tag"]).toContain("noindex");
  expect(await page.text()).not.toContain("local-browser-test-password");
  expect(await page.text()).not.toContain("testDocumentId01234567890");
});

test("editor logs in, loads, edits, saves and logs out", async ({ page }) => {
  let signedIn = false;
  let savedText = "Rajesh builds healthcare software.";
  const stats = { chunks: 12, dimensions: 768, model: "gemini-embedding-001", indexedAt: "2026-09-16T00:00:00Z", version: "a".repeat(64) };
  await page.route("**/api/chat-admin/session", async (route) => {
    if (route.request().method() === "POST") signedIn = true;
    if (route.request().method() === "DELETE") signedIn = false;
    await route.fulfill({ status: signedIn ? 200 : route.request().method() === "GET" ? 401 : 200, json: { authenticated: signedIn } });
  });
  await page.route("**/api/chat-admin/content", async (route) => {
    if (route.request().method() === "PUT") savedText = route.request().postDataJSON().text;
    await route.fulfill({ json: { text: savedText, version: "a".repeat(64), editable: true, loadedAt: "2026-09-16T00:00:00Z", rag: stats } });
  });
  await page.route("**/api/chat-admin/retrieval", async (route) => {
    await route.fulfill({ json: { stats, matches: route.request().postDataJSON().question ? [{ id: "S1", text: savedText, score: 0.82 }] : [] } });
  });
  await page.goto("/rajesh-chat-update");
  await page.getByLabel("Password", { exact: true }).fill("test-password");
  await page.getByRole("button", { name: "Unlock editor" }).click();
  await page.getByRole("button", { name: "Load from Drive" }).click();
  await expect(page.getByLabel("About Rajesh", { exact: true })).toHaveValue(savedText);
  await page.getByLabel("About Rajesh", { exact: true }).fill("Rajesh builds healthcare and learning tools.");
  await expect(page.getByText(/Unsaved changes/)).toBeVisible();
  await page.getByRole("button", { name: "Save to Drive" }).click();
  await expect(page.getByText(/Saved to Drive and ingested/)).toBeVisible();
  expect(savedText).toBe("Rajesh builds healthcare and learning tools.");
  await page.getByRole("button", { name: "Show retrieved facts" }).click();
  await expect(page.getByText("0.820 similarity")).toBeVisible();
  await page.screenshot({ path: "test-results/chat-editor.png", fullPage: true });
  await page.getByRole("button", { name: "Sign out" }).click();
  await expect(page.getByRole("button", { name: "Unlock editor" })).toBeVisible();
});

test("mobile chat shows an answer, retains a failed question, and fits the screen", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  let fail = false;
  await page.route("**/api/chat", async (route) => {
    const messages = route.request().postDataJSON().messages;
    expect(messages.at(-1).role).toBe("user");
    await route.fulfill(fail ? { status: 503, json: { error: "Please try again shortly." } } : { json: { answer: "Rajesh builds healthcare software and AI tools." } });
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Ask about me" }).click();
  await page.getByRole("button", { name: "What does Rajesh build?" }).click();
  await expect(page.getByText("Rajesh builds healthcare software and AI tools.")).toBeVisible();
  const panel = page.getByRole("dialog");
  const bounds = await panel.boundingBox();
  expect(bounds!.x).toBeGreaterThanOrEqual(0);
  expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(390);
  await page.screenshot({ path: "test-results/chat-mobile.png" });
  fail = true;
  await page.getByLabel("Your question about Rajesh").fill("What did he study?");
  await page.getByRole("button", { name: "Send question" }).click();
  await expect(panel.getByRole("alert")).toHaveText("Please try again shortly.");
  await expect(page.getByLabel("Your question about Rajesh")).toHaveValue("What did he study?");
  await page.keyboard.press("Escape");
  await expect(panel).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Ask about me" })).toBeFocused();
});

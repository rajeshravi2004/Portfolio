import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/ui",
  fullyParallel: false,
  workers: 1,
  use: { baseURL: "http://localhost:3108", headless: true, trace: "retain-on-failure" },
  webServer: {
    command: "npm run start -- -p 3108",
    url: "http://localhost:3108",
    reuseExistingServer: false,
    env: { CHAT_ADMIN_PASSWORD: "local-browser-test-password", CHAT_DRIVE_FILE_URL: "https://docs.google.com/document/d/testDocumentId01234567890/edit", GOOGLE_SERVICE_ACCOUNT_EMAIL: "", GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY: "", GEMINI_API_KEY: "" },
  },
});

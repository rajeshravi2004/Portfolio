import "server-only";
import { PDFDocument, StandardFonts, rgb, type PDFFont } from "pdf-lib";
import { Document, Footer, PageNumber, Packer, Paragraph, TextRun, LineRuleType, AlignmentType, BorderStyle } from "docx";
import { ChatError } from "../chat/http";
import type { CareerDocument } from "./types";

const WIDTH = 595.28;
const HEIGHT = 841.89;
const MARGIN = 44;
type Row = { text: string; size: number; height: number; bold: boolean; accent: boolean };

function wrap(text: string, font: PDFFont, size: number, width: number): string[] {
  const lines: string[] = [];
  for (const paragraph of text.split(/\r?\n/)) {
    let line = "";
    for (const word of paragraph.split(/\s+/).filter(Boolean)) {
      if (line && font.widthOfTextAtSize(`${line} ${word}`, size) > width) { lines.push(line); line = ""; }
      // Long URLs must wrap too, rather than extend outside the page.
      let chunk = "";
      for (const char of word) {
        if (font.widthOfTextAtSize(chunk + char, size) > width) { lines.push(chunk); chunk = ""; }
        chunk += char;
      }
      line = line ? `${line} ${chunk}` : chunk;
    }
    lines.push(line);
  }
  return lines;
}

async function layout(doc: CareerDocument) {
  const pdf = await PDFDocument.create();
  const serif = ["classic", "elegant"].includes(doc.style);
  const regular = await pdf.embedFont(serif ? StandardFonts.TimesRoman : StandardFonts.Helvetica);
  const bold = await pdf.embedFont(serif ? StandardFonts.TimesRomanBold : StandardFonts.HelveticaBold);
  const layouts: Row[][] = [];
  for (let index = 0; index < doc.pages.length; index++) {
    let fitted: Row[] | undefined;
    for (let size = 11; size >= 9; size -= 0.5) {
      const rows: Row[] = [];
      const space = (height: number) => rows.push({ text: "", size, height, bold: false, accent: false });
      const add = (text: string, fontSize = size, strong = false, accent = false) => {
        if (!text) return;
        for (const line of wrap(text, strong ? bold : regular, fontSize, WIDTH - MARGIN * 2)) rows.push({ text: line, size: fontSize, height: fontSize * 1.35, bold: strong, accent });
      };
      add(doc.title, index === 0 ? 23 : 16, true, doc.style !== "minimal");
      add(doc.subtitle, size + 1);
      if (index === 0) { space(5); for (const contact of doc.contact) add(contact, 9); }
      space(16);
      for (const section of doc.pages[index].sections) {
        if (section.heading) { add(section.heading.toUpperCase(), size + 1, true, true); space(5); }
        for (const entry of section.entries) {
          add(entry.title, size, true);
          add(entry.detail, size - 0.5);
          for (const paragraph of entry.paragraphs) { add(paragraph); space(4); }
          for (const bullet of entry.bullets) add(`• ${bullet}`);
          space(7);
        }
        space(5);
      }
      if (rows.reduce((sum, row) => sum + row.height, 0) <= HEIGHT - MARGIN * 2 - 25) { fitted = rows; break; }
    }
    if (!fitted) throw new ChatError("This document has too much content to fit cleanly. Ask for shorter text or more pages.", 422);
    layouts.push(fitted);
  }
  return { pdf, regular, bold, layouts, fontName: serif ? "Times New Roman" : "Arial" };
}

export async function checkDocumentLayout(doc: CareerDocument) {
  try { await layout(doc); } catch (error) {
    if (error instanceof ChatError) throw error;
    throw new ChatError("Please use Latin characters for PDF exports. This document contains a character the PDF fonts cannot render.", 422);
  }
}

export async function renderDocument(doc: CareerDocument, format: "pdf" | "docx") {
  let prepared: Awaited<ReturnType<typeof layout>>;
  try { prepared = await layout(doc); } catch (error) {
    if (error instanceof ChatError) throw error;
    throw new ChatError("This document contains a character the export fonts cannot render. Please ask for an English version.", 422);
  }
  const { pdf, regular, bold, layouts, fontName } = prepared;
  const hex = doc.style === "minimal" ? "#202020" : doc.accent;
  const color = rgb(...[1, 3, 5].map((offset) => parseInt(hex.slice(offset, offset + 2), 16) / 255) as [number, number, number]);
  if (format === "pdf") {
    pdf.setTitle(`${doc.title} — ${doc.kind === "resume" ? "Resume" : "Cover Letter"}`);
    pdf.setAuthor(doc.title);
    for (const [index, rows] of layouts.entries()) {
      const page = pdf.addPage([WIDTH, HEIGHT]);
      if (["modern", "elegant"].includes(doc.style)) page.drawRectangle({ x: MARGIN, y: HEIGHT - 29, width: WIDTH - MARGIN * 2, height: 2, color });
      let y = HEIGHT - MARGIN;
      for (const row of rows) {
        y -= row.height;
        if (row.text) page.drawText(row.text, { x: MARGIN, y, size: row.size, font: row.bold ? bold : regular, color: row.accent ? color : rgb(0.12, 0.14, 0.17) });
      }
      page.drawText(`${index + 1} / ${layouts.length}`, { x: WIDTH - MARGIN - 30, y: 25, size: 8, font: regular, color: rgb(0.4, 0.4, 0.4) });
    }
    return pdf.save();
  }
  const children = layouts.flatMap((rows, pageIndex) => rows.map((row, rowIndex) => new Paragraph({
    pageBreakBefore: pageIndex > 0 && rowIndex === 0,
    ...(rowIndex === 0 && ["modern", "elegant"].includes(doc.style) ? { border: { top: { color: hex.slice(1), style: BorderStyle.SINGLE, size: 8, space: 6 } } } : {}),
    spacing: { before: 0, after: 0, line: Math.round(row.height * 20), lineRule: LineRuleType.EXACT },
    children: [new TextRun({ text: row.text || " ", font: fontName, size: Math.round(row.size * 2), bold: row.bold, color: row.accent ? hex.slice(1) : "20242B" })],
  })));
  const word = new Document({ creator: doc.title, title: `${doc.title} ${doc.kind}`, styles: { default: { document: { run: { font: fontName, size: 22 }, paragraph: { spacing: { after: 0 } } } } }, sections: [{
    properties: { page: { size: { width: Math.round(WIDTH * 20), height: Math.round(HEIGHT * 20) }, margin: { top: MARGIN * 20, bottom: MARGIN * 20, left: MARGIN * 20, right: MARGIN * 20, footer: 400 } } },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ children: [PageNumber.CURRENT, " / ", PageNumber.TOTAL_PAGES], size: 16, color: "666666" })] })] }) }, children,
  }] });
  return new Uint8Array(await Packer.toBuffer(word));
}

export function fileResponse(bytes: Uint8Array, doc: CareerDocument, format: "pdf" | "docx") {
  const filename = `${doc.title.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") || "Rajesh-R"}-${doc.kind}.${format}`;
  return new Response(Buffer.from(bytes), { headers: {
    "Content-Type": format === "pdf" ? "application/pdf" : "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "Content-Disposition": `attachment; filename="${filename}"`, "Cache-Control": "private, no-store",
    "X-Content-Type-Options": "nosniff", "X-Robots-Tag": "noindex, nofollow, noarchive",
  } });
}

export type CareerDocument = {
  kind: "resume" | "cover-letter";
  title: string;
  subtitle: string;
  contact: string[];
  style: "modern" | "minimal" | "classic" | "elegant";
  accent: string;
  pages: { sections: { heading: string; entries: { title: string; detail: string; paragraphs: string[]; bullets: string[] }[] }[] }[];
};

export type DocumentAttachment = {
  title: string;
  kind: CareerDocument["kind"];
  style: CareerDocument["style"];
  pageCount: number;
  token: string;
  expiresAt: string;
};

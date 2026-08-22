import Image from "next/image";
import type { ReactNode } from "react";

type BrandIconAsset = {
  source: string;
  needsSurface?: boolean;
};

const brandIcons: Record<string, BrandIconAsset> = {
  react: { source: "/tech-icons/react-original.svg" },
  "react 19": { source: "/tech-icons/react-original.svg" },
  "next.js": { source: "/tech-icons/nextjs-plain.svg", needsSurface: true },
  javascript: { source: "/tech-icons/javascript-plain.svg" },
  "vanilla javascript": { source: "/tech-icons/javascript-plain.svg" },
  "vanilla js": { source: "/tech-icons/javascript-plain.svg" },
  js: { source: "/tech-icons/javascript-plain.svg" },
  typescript: { source: "/tech-icons/typescript-original.svg" },
  ts: { source: "/tech-icons/typescript-original.svg" },
  html5: { source: "/tech-icons/html5-plain.svg" },
  css3: { source: "/tech-icons/css3-plain.svg" },
  css: { source: "/tech-icons/css3-plain.svg" },
  stylesheets: { source: "/tech-icons/css3-plain.svg" },
  scss: { source: "/tech-icons/sass-original.svg" },
  bootstrap: { source: "/tech-icons/bootstrap-plain.svg" },
  "tailwind css": { source: "/tech-icons/tailwindcss-original.svg" },
  redux: { source: "/tech-icons/redux-original.svg" },
  electron: { source: "/tech-icons/electron-original.svg" },
  xml: { source: "/tech-icons/xml-plain.svg" },
  "node.js": { source: "/tech-icons/nodejs-plain.svg" },
  nestjs: { source: "/tech-icons/nestjs-original.svg" },
  "express.js": { source: "/tech-icons/express-original.svg", needsSurface: true },
  python: { source: "/tech-icons/python-plain.svg" },
  django: { source: "/tech-icons/django-plain.svg", needsSurface: true },
  "django 5": { source: "/tech-icons/django-plain.svg", needsSurface: true },
  flask: { source: "/tech-icons/flask-original.svg", needsSurface: true },
  fastapi: { source: "/tech-icons/fastapi-plain.svg" },
  postgresql: { source: "/tech-icons/postgresql-plain.svg" },
  psql: { source: "/tech-icons/postgresql-plain.svg" },
  mysql: { source: "/tech-icons/mysql-original.svg" },
  mongodb: { source: "/tech-icons/mongodb-plain.svg" },
  mariadb: { source: "/tech-icons/mariadb-original.svg" },
  redis: { source: "/tech-icons/redis-plain.svg" },
  "google cloud platform": { source: "/tech-icons/googlecloud-plain.svg" },
  "google cloud storage": { source: "/tech-icons/googlecloud-plain.svg" },
  gcs: { source: "/tech-icons/googlecloud-plain.svg" },
  "google cloud api gateway": { source: "/tech-icons/googlecloud-plain.svg" },
  "vertex ai": { source: "/tech-icons/googlecloud-plain.svg" },
  aws: { source: "/tech-icons/amazonwebservices-original-wordmark.svg" },
  "amazon s3": { source: "/tech-icons/amazonwebservices-original-wordmark.svg" },
  docker: { source: "/tech-icons/docker-plain.svg" },
  kubernetes: { source: "/tech-icons/kubernetes-plain.svg" },
  git: { source: "/tech-icons/git-plain.svg" },
  github: { source: "/tech-icons/github-original.svg", needsSurface: true },
  "vs code": { source: "/tech-icons/vscode-plain.svg" },
  postman: { source: "/tech-icons/postman-plain.svg" },
  selenium: { source: "/tech-icons/selenium-original.svg" },
  playwright: { source: "/tech-icons/playwright-plain.svg" },
  puppeteer: { source: "/tech-icons/puppeteer-plain.svg" },
  vite: { source: "/tech-icons/vitejs-plain.svg" },
  json: { source: "/tech-icons/json-plain.svg" },
  c: { source: "/tech-icons/c-original.svg" },
  "c++": { source: "/tech-icons/cplusplus-plain.svg" },
  java: { source: "/tech-icons/java-plain.svg" },
  "c#": { source: "/tech-icons/csharp-plain.svg" },
  r: { source: "/tech-icons/r-plain.svg" },
};

function BrandIcon({ asset }: { asset: BrandIconAsset }) {
  return (
    <span
      className={`tech-icon tech-icon-brand${asset.needsSurface ? " tech-icon-surface" : ""}`}
      aria-hidden="true"
    >
      <Image src={asset.source} alt="" width={18} height={18} />
    </span>
  );
}

function Icon({ children, color }: { children: ReactNode; label: string; color?: string }) {
  return <svg className="tech-icon" viewBox="0 0 24 24" style={color ? { color } : undefined} aria-hidden="true" focusable="false">{children}</svg>;
}

export function TechIcon({ name }: { name: string }) {
  const key = name.toLowerCase();
  const brandIcon = brandIcons[key];

  if (brandIcon) return <BrandIcon asset={brandIcon} />;

  if (key === "react") return <Icon label={name}><circle cx="12" cy="12" r="2" fill="currentColor" /><ellipse cx="12" cy="12" rx="9" ry="3.8" /><ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(120 12 12)" /></Icon>;
  if (key.includes("javascript")) return <Icon label={name}><rect x="3" y="3" width="18" height="18" rx="2" fill="currentColor" /><text x="7" y="17" className="tech-icon-text tech-icon-text-dark">JS</text></Icon>;
  if (key === "html5" || key === "css3") return <Icon label={name}><path d="M4 2h16l-1.5 17L12 22l-6.5-3L4 2z" fill="currentColor" /><text x={key === "html5" ? "7" : "6.5"} y="15.5" className="tech-icon-text tech-icon-text-dark">{key === "html5" ? "5" : "3"}</text></Icon>;
  if (key.includes("tailwind")) return <Icon label={name}><path d="M3 10c2.2-4 4.7-5 7.4-3 1.5 1.1 2.4 1.4 4.1.5 1.7-.8 3.4-.6 5.5.8-2.1 4.1-4.7 5-7.4 3-1.5-1.1-2.4-1.4-4.1-.5-1.7.8-3.4.6-5.5-.8zm0 6c2.2-4 4.7-5 7.4-3 1.5 1.1 2.4 1.4 4.1.5 1.7-.8 3.4-.6 5.5.8-2.1 4.1-4.7 5-7.4 3-1.5-1.1-2.4-1.4-4.1-.5-1.7.8-3.4.6-5.5-.8z" fill="currentColor" /></Icon>;
  if (key.includes("responsive")) return <Icon label={name}><rect x="2" y="4" width="15" height="11" rx="1" /><path d="M7 20h5m-2.5-5v5" /><rect x="18" y="8" width="4" height="9" rx="1" /></Icon>;
  if (key.includes("websocket")) return <Icon label={name}><circle cx="5" cy="12" r="2" fill="currentColor" /><circle cx="19" cy="6" r="2" fill="currentColor" /><circle cx="19" cy="18" r="2" fill="currentColor" /><path d="M7 11l10-4M7 13l10 4" /></Icon>;
  if (key.includes("node")) return <Icon label={name}><path d="M12 2l9 5v10l-9 5-9-5V7l9-5z" /><path d="M8 16V8l8 8V8" /></Icon>;
  if (key.includes("express")) return <Icon label={name}><path d="M3 7l7 10m0-10L3 17m9 0l4-6 4 6m-7-3h7" /><circle cx="19.5" cy="7" r="1" fill="currentColor" /></Icon>;
  if (key === "python") return <Icon label={name}><path d="M7 3h6a3 3 0 013 3v4H8a3 3 0 00-3 3v2H3V9a3 3 0 013-3h7" /><path d="M17 21h-6a3 3 0 01-3-3v-4h8a3 3 0 003-3V9h2v6a3 3 0 01-3 3h-7" /><circle cx="8" cy="5.5" r=".8" fill="currentColor" /><circle cx="16" cy="18.5" r=".8" fill="currentColor" /></Icon>;
  if (key.includes("django")) return <Icon label={name}><path d="M7 4h5v13H8a5 5 0 010-10h4m4-3v13a4 4 0 01-4 4h-2" /></Icon>;
  if (key === "flask") return <Icon label={name}><path d="M9 2h6M10 2v6l-6 11a2 2 0 002 3h12a2 2 0 002-3L14 8V2M7 16h10" /></Icon>;
  if (key.includes("api") || key.includes("pub/sub")) return <Icon label={name}><circle cx="5" cy="12" r="2" /><circle cx="19" cy="6" r="2" /><circle cx="19" cy="18" r="2" /><path d="M7 12h5m3-4l2-1m-2 9l2 1m-5-8v6" /></Icon>;
  if (key.includes("postgres") || key.includes("qdrant") || key.includes("faiss") || key.includes("mysql") || key.includes("mongo") || key.includes("oracle") || key.includes("data processing")) return <Icon label={name}><ellipse cx="12" cy="5" rx="7" ry="3" /><path d="M5 5v7c0 1.7 3.1 3 7 3s7-1.3 7-3V5M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" /></Icon>;
  if (key.includes("google cloud") || key.includes("cloud storage")) return <Icon label={name}><path d="M7 18h11a4 4 0 000-8 6 6 0 00-11.5-1.7A5 5 0 007 18z" /><path d="M8 18h8" /></Icon>;
  if (key === "docker") return <Icon label={name}><path d="M3 13h14c-.3 4.5-3.5 7-7.5 7C6 20 3.5 18 3 13z" /><path d="M5 10h3v3H5zm3-4h3v4H8zm0 4h3v3H8zm3 0h3v3h-3zm3 0h3v3h-3m3 1c2-3 3.5-2 4-1-1 2-2.5 2.5-4 2" /></Icon>;
  if (key === "kubernetes") return <Icon label={name}><path d="M12 2l8 5v10l-8 5-8-5V7l8-5z" /><circle cx="12" cy="12" r="3" /><path d="M12 5v4m0 6v4M5 12h4m6 0h4m-12-5l3 3m4 4l3 3m0-10l-3 3m-4 4l-3 3" /></Icon>;
  if (key.includes("llm") || key === "rag" || key.includes("prompt") || key.includes("gemini") || key.includes("langchain") || key.includes("chat") || key.includes("ai / ml") || key.includes("deep learning")) return <Icon label={name}><path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" /><path d="M19 15l.7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15z" /></Icon>;
  if (key.includes("swagger") || key === "openapi") return <Icon label={name}><path d="M7 2h7l4 4v16H7V2z" /><path d="M14 2v5h5M10 12h5m-5 4h5" /></Icon>;
  if (key === "git") return <Icon label={name}><path d="M12 2l10 10-10 10L2 12 12 2z" /><circle cx="9" cy="9" r="1.5" fill="currentColor" /><circle cx="15" cy="15" r="1.5" fill="currentColor" /><circle cx="15" cy="9" r="1.5" fill="currentColor" /><path d="M10 9h3.5M9 10v3l4.5 2" /></Icon>;
  if (key === "github") return <Icon label={name}><path d="M12 2a10 10 0 00-3.2 19.5v-3c-2.4.5-3-1-3.2-1.7-.2-.6-.8-1.4-1.3-1.7-.5-.3-1.1-1 .1-1 1.1 0 1.8 1 2.1 1.5 1.2 2 3.2 1.4 4 .9.1-.9.5-1.5.9-1.8-1.9-.2-3.9-1-3.9-4.3 0-1 .3-1.8 1-2.4-.1-.2-.4-1.1.1-2.4 0 0 .8-.2 2.7 1a9.5 9.5 0 014.9 0c1.9-1.2 2.7-1 2.7-1 .5 1.3.2 2.2.1 2.4.6.7 1 1.5 1 2.4 0 3.4-2 4.1-4 4.3.5.4 1 1.3 1 2.5v3.3A10 10 0 0012 2z" fill="currentColor" /></Icon>;
  if (key.includes("vs code")) return <Icon label={name}><path d="M17 3l4 2v14l-4 2-9-8-4 3-2-1V9l2-1 4 3 9-8zM8 11l9-6v14l-9-6" /></Icon>;
  if (key === "postman") return <Icon label={name}><circle cx="12" cy="12" r="9" /><path d="M7 15l9-8 2 2-8 9-3-3zm7-6l2 2" /></Icon>;
  if (key === "electron") return <Icon label={name}><circle cx="12" cy="12" r="1.7" fill="currentColor" /><ellipse cx="12" cy="12" rx="9" ry="4" /><ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(55 12 12)" /></Icon>;
  if (key === "vite") return <Icon label={name}><path d="M4 4l8 17 8-17-8 3-8-3z" /><path d="M14 2l-5 10h4l-2 7 6-11h-4l1-6z" /></Icon>;
  if (key.includes("youtube")) return <Icon label={name} color="#ff0033"><rect x="2" y="6" width="20" height="12" rx="4" /><path d="M10 9l5 3-5 3V9z" fill="currentColor" /></Icon>;
  if (key === "stripe") return <Icon label={name} color="#635bff"><rect x="3" y="3" width="18" height="18" rx="4" fill="currentColor" /><path d="M15.5 8.2c-1-.5-2-.7-3.2-.7-1.8 0-3 .8-3 2.1 0 2.3 6 1.2 6 4.4 0 1.5-1.3 2.5-3.4 2.5-1.3 0-2.5-.3-3.4-.8" stroke="var(--bg)" /></Icon>;
  if (key.includes("razorpay") || key.includes("invoice ninja") || key.includes("payment handler")) return <Icon label={name}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18M7 15h4" /></Icon>;
  if (key.includes("blockchain") || key === "web3") return <Icon label={name}><path d="M8.5 7.5l-2-2a3 3 0 00-4.2 4.2l3 3a3 3 0 004.2 0l1-1m5-1l2 2a3 3 0 01-4.2 4.2l-3-3a3 3 0 010-4.2l1-1" /></Icon>;
  if (key.includes("indexeddb") || key.includes("cookie") || key.includes("local storage") || key.includes("session storage") || key.includes("private state") || key.includes("back/forward") || key.includes("background fetch") || key.includes("notification")) return <Icon label={name}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 9h20M6 6.5h.1m3 0h.1M7 14h4m-4 3h8" /></Icon>;
  if (key.includes("puppeteer") || key.includes("selenium") || key.includes("playwright") || key.includes("web scraping")) return <Icon label={name}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 9h20M6 6.5h.1m3 0h.1M9 15l2 2 4-5" /></Icon>;
  if (key.includes("pdf")) return <Icon label={name}><path d="M6 2h9l4 4v16H6V2zM15 2v5h5" /><path d="M9 12h6m-6 4h6" /></Icon>;
  if (key.includes("docx")) return <Icon label={name}><path d="M6 2h9l4 4v16H6V2zM15 2v5h5" /><path d="M9 12l2 6 2-4 2 4 2-6" /></Icon>;
  if (key.includes("ui / ux")) return <Icon label={name}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 9v12m3-8h6m-6 4h4" /></Icon>;
  if (key.includes("word") || key.includes("excel") || key.includes("powerpoint") || key.includes("tally")) {
    const letter = key.includes("excel") ? "X" : key.includes("powerpoint") ? "P" : key.includes("tally") ? "T" : "W";
    const color = key.includes("excel") ? "#217346" : key.includes("powerpoint") ? "#d24726" : key.includes("tally") ? "#e31837" : "#2b579a";
    return <Icon label={name} color={color}><rect x="3" y="3" width="18" height="18" rx="2" fill="currentColor" /><text x="7" y="17" className="tech-icon-text tech-icon-text-dark">{letter}</text></Icon>;
  }

  return <Icon label={name}><path d="M9 7L4 12l5 5m6-10l5 5-5 5m-3-12l-2 14" /></Icon>;
}

export function TechGroupIcon({ index }: { index: number }) {
  const icons = [
    <><rect key="a" x="3" y="4" width="18" height="14" rx="2" /><path key="b" d="M7 9l3 3-3 3m5 0h5" /></>,
    <><rect key="a" x="4" y="3" width="16" height="6" rx="1" /><rect key="b" x="4" y="15" width="16" height="6" rx="1" /><path key="c" d="M8 9v6m8-6v6M8 6h.1M8 18h.1" /></>,
    <><path key="a" d="M7 18h11a4 4 0 000-8 6 6 0 00-11.5-1.7A5 5 0 007 18z" /><path key="b" d="M12 12v9m-3-3l3 3 3-3" /></>,
    <><path key="a" d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" /><circle key="b" cx="18" cy="18" r="3" /></>,
    <><path key="a" d="M6 2h9l4 4v16H6V2zM15 2v5h5" /><path key="b" d="M9 12h7m-7 4h7" /></>,
    <><rect key="a" x="3" y="4" width="18" height="16" rx="2" /><path key="b" d="M3 9h18M7 14h4m-4 3h8" /></>,
    <><path key="a" d="M8.5 7.5l-2-2a3 3 0 00-4.2 4.2l3 3a3 3 0 004.2 0l1-1m5-1l2 2a3 3 0 01-4.2 4.2l-3-3a3 3 0 010-4.2l1-1" /></>,
    <><circle key="a" cx="6" cy="12" r="2" /><circle key="b" cx="18" cy="6" r="2" /><circle key="c" cx="18" cy="18" r="2" /><path key="d" d="M8 12h4m3-4l1.5-1m-1.5 9l1.5 1m-4.5-8v6" /></>,
    <><path key="a" d="M12 3v18M4 7h16M4 17h16" /><circle key="b" cx="12" cy="12" r="9" /></>,
  ];
  return <svg className="tech-group-icon" viewBox="0 0 24 24" aria-hidden="true">{icons[index] ?? icons[0]}</svg>;
}

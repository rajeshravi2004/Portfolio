import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function ChatMarkdown({ children }: { children: string }) {
  return <div className="chat-markdown">
    <Markdown
      remarkPlugins={[remarkGfm]}
      skipHtml
      disallowedElements={["img"]}
      components={{
        h1: ({ children }) => <h3>{children}</h3>,
        h2: ({ children }) => <h3>{children}</h3>,
        h3: ({ children }) => <h3>{children}</h3>,
        a: ({ href, children }) => href ? <a href={href} target="_blank" rel="noopener noreferrer">{children}</a> : <span>{children}</span>,
        table: ({ children }) => <div className="chat-table-scroll" role="region" aria-label="Answer table" tabIndex={0}><table>{children}</table></div>,
      }}
    >{children}</Markdown>
  </div>;
}

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // Supports GitHub-flavored markdown
import MintButton from "./MintButton"; // ✅ Import Mint Button

const MarkdownRenderer = ({ content }: { content: string }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]} // Enables tables, strikethrough, etc.
      components={{
        p({ children }) {
          // ✅ Detect [MINT_BUTTON] placeholder and replace it with the button
          if (String(children).trim() === "[MINT_BUTTON]") {
            return <MintButton />;
          }
          return <p>{children}</p>;
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;

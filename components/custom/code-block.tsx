"use client";

import { Copy, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Prism from "prismjs";

import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-json";
// Import more languages as needed

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export function CodeBlock({ code, language = "tsx", title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [highlighted, setHighlighted] = useState<string>("");

  useEffect(() => {
    // Dynamically load the correct Prism CSS based on theme
    const theme = localStorage.getItem("theme");
    const cssId = "prism-theme-style";
    let link = document.getElementById(cssId) as HTMLLinkElement | null;

    if (!link) {
      link = document.createElement("link");
      link.rel = "stylesheet";
      link.id = cssId;
      document.head.appendChild(link);
    }

    link.href = theme === "dark" ? "/prism-dark.css" : "/prism.css";
  }, []);

  useEffect(() => {
    // Fallback to 'typescript' if 'tsx' is provided, as Prism doesn't have 'tsx'
    const lang = language === "tsx" ? "typescript" : language;
    const grammar = Prism.languages[lang] || Prism.languages.javascript;
    setHighlighted(Prism.highlight(code, grammar, lang));
  }, [code, language]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-lg border bg-muted/50">
      {title && (
        <div className="flex items-center justify-between border-b px-4 py-2">
          <span className="text-sm font-medium">{title}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="h-6 w-6 p-0"
          >
            {copied ? (
              <Check className="h-3 w-3" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </Button>
        </div>
      )}
      <pre className="overflow-x-auto p-4">
        <code
          className={`language-${language} text-sm`}
          dangerouslySetInnerHTML={{
            __html: highlighted,
          }}
        />
      </pre>
    </div>
  );
}

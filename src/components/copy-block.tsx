"use client";

import { useRef, useState } from "react";

export function CopyBlock({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  const code = useRef<HTMLElement>(null);
  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const range = document.createRange();
      if (!code.current) return;
      range.selectNodeContents(code.current);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
      document.execCommand("copy");
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }
  return <div className="copy-section">
    <div className="copy-heading"><span>{label}</span><button onClick={copy} aria-live="polite">{copied ? "已复制 ✓" : "复制"}</button></div>
    <pre><code ref={code}>{value}</code></pre>
  </div>;
}


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "./icons";

export function SearchBox({ initial = "", compact = false }: { initial?: string; compact?: boolean }) {
  const [value, setValue] = useState(initial);
  const [composing, setComposing] = useState(false);
  const router = useRouter();
  function submit() {
    if (composing) return;
    const query = value.trim();
    router.push(query ? `/search?q=${encodeURIComponent(query)}` : "/");
  }
  return <div className={`search-box ${compact ? "compact" : ""}`}>
    <SearchIcon />
    <input aria-label="搜索资源" value={value} placeholder="搜索应用、SKILL、MCP…"
      onChange={(event) => setValue(event.target.value)} onCompositionStart={() => setComposing(true)}
      onCompositionEnd={() => setComposing(false)} onKeyDown={(event) => { if (event.key === "Enter") submit(); }} />
    <button type="button" onClick={submit} aria-label="提交搜索">搜索</button>
  </div>;
}


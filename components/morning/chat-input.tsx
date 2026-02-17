"use client"

import { useState } from "react"
import { SendHorizonal } from "lucide-react"

export function ChatInput() {
  const [value, setValue] = useState("")

  return (
    <div className="flex items-center gap-2 rounded-2xl bg-card border border-border px-4 py-2 shadow-sm">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="예: 20분 명상 추가해줘"
        className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
      />
      <button
        type="button"
        disabled={!value.trim()}
        className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
        aria-label="Send message"
      >
        <SendHorizonal className="size-4" />
      </button>
    </div>
  )
}

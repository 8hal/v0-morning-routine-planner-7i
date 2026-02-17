"use client"

import { useState } from "react"
import { Flag, Briefcase, Home } from "lucide-react"

export function AnchorTimeCard() {
  const [commuteType, setCommuteType] = useState<"office" | "remote">("office")

  return (
    <div className="rounded-2xl bg-card p-5 shadow-sm border border-border">
      <div className="flex items-center gap-2 text-muted-foreground mb-4">
        <Flag className="size-4 text-primary" />
        <span className="text-sm font-semibold text-foreground">{"앵커 타임"}</span>
      </div>

      <button
        type="button"
        className="mb-4 w-full rounded-xl bg-secondary px-4 py-3 text-center text-3xl font-bold text-primary transition-colors hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        09:00
      </button>

      <div className="flex rounded-xl bg-muted p-1">
        <button
          type="button"
          onClick={() => setCommuteType("office")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
            commuteType === "office"
              ? "bg-card text-primary shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Briefcase className="size-4" />
          <span>{"출근"}</span>
        </button>
        <button
          type="button"
          onClick={() => setCommuteType("remote")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
            commuteType === "remote"
              ? "bg-card text-primary shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Home className="size-4" />
          <span>{"재택"}</span>
        </button>
      </div>
    </div>
  )
}

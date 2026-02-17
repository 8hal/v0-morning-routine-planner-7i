"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

interface RoutineBlock {
  id: string
  name: string
  duration: number
  defaultChecked: boolean
}

const defaultBlocks: RoutineBlock[] = [
  { id: "meditation", name: "명상", duration: 20, defaultChecked: true },
  { id: "shower", name: "샤워", duration: 15, defaultChecked: true },
  { id: "breakfast", name: "아침식사", duration: 30, defaultChecked: false },
]

export function BlockList() {
  const [selected, setSelected] = useState<Set<string>>(
    new Set(defaultBlocks.filter((b) => b.defaultChecked).map((b) => b.id))
  )

  const toggleBlock = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const selectAll = () => {
    if (selected.size === defaultBlocks.length) {
      setSelected(new Set())
    } else {
      setSelected(new Set(defaultBlocks.map((b) => b.id)))
    }
  }

  const selectedBlocks = defaultBlocks.filter((b) => selected.has(b.id))
  const totalMinutes = selectedBlocks.reduce((sum, b) => sum + b.duration, 0)

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold text-foreground">{"블록 구성"}</h2>
        <button
          type="button"
          onClick={selectAll}
          className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          {selected.size === defaultBlocks.length ? "전체 해제" : "전체 선택"}
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {defaultBlocks.map((block) => {
          const isSelected = selected.has(block.id)
          return (
            <button
              key={block.id}
              type="button"
              onClick={() => toggleBlock(block.id)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3.5 transition-all ${
                isSelected
                  ? "bg-secondary border border-primary/20"
                  : "bg-card border border-border"
              }`}
            >
              <Checkbox
                checked={isSelected}
                className="pointer-events-none size-5 rounded-md"
                tabIndex={-1}
              />
              <span
                className={`flex-1 text-left text-sm font-medium ${
                  isSelected ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {block.name}
              </span>
              <Badge
                variant={isSelected ? "default" : "secondary"}
                className={`rounded-full text-xs font-medium ${
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {block.duration}{"분"}
              </Badge>
            </button>
          )
        })}
      </div>

      <div className="mt-4 flex items-center justify-between rounded-xl bg-card border border-border px-4 py-3">
        <span className="text-sm font-medium text-muted-foreground">
          {selectedBlocks.length}{"개 · "}
          {totalMinutes}{"분"}
        </span>
        <span className="text-sm font-semibold text-primary">
          {"07:55 → 09:00"}
        </span>
      </div>
    </div>
  )
}

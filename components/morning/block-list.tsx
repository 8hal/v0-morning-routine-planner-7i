"use client"

import { useState, useRef, useCallback } from "react"
import { Badge } from "@/components/ui/badge"

export interface RoutineBlock {
  id: string
  name: string
  duration: number
}

interface BlockListProps {
  blocks: RoutineBlock[]
  onBlocksChange: (blocks: RoutineBlock[]) => void
}

function GripIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="9" cy="5" r="1" />
      <circle cx="9" cy="12" r="1" />
      <circle cx="9" cy="19" r="1" />
      <circle cx="15" cy="5" r="1" />
      <circle cx="15" cy="12" r="1" />
      <circle cx="15" cy="19" r="1" />
    </svg>
  )
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

function MinusIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 12h14" />
    </svg>
  )
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}

export function BlockList({ blocks, onBlocksChange: setBlocks }: BlockListProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null)
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const deleteBlock = (id: string) => {
    setBlocks(blocks.filter((b) => b.id !== id))
  }

  const updateDuration = (id: string, delta: number) => {
    setBlocks(
      blocks.map((b) =>
        b.id === id ? { ...b, duration: Math.max(5, Math.min(120, b.duration + delta)) } : b
      )
    )
  }

  const handleDragStart = useCallback((idx: number) => {
    setDraggedIdx(idx)
  }, [])

  const handleDragOver = useCallback(
    (e: React.DragEvent, idx: number) => {
      e.preventDefault()
      if (draggedIdx === null || draggedIdx === idx) return
      setDragOverIdx(idx)
    },
    [draggedIdx]
  )

  const handleDrop = useCallback(
    (idx: number) => {
      if (draggedIdx === null || draggedIdx === idx) {
        setDraggedIdx(null)
        setDragOverIdx(null)
        return
      }
      const next = [...blocks]
      const [moved] = next.splice(draggedIdx, 1)
      next.splice(idx, 0, moved)
      setBlocks(next)
      setDraggedIdx(null)
      setDragOverIdx(null)
    },
    [draggedIdx, blocks, setBlocks]
  )

  const handleDragEnd = useCallback(() => {
    setDraggedIdx(null)
    setDragOverIdx(null)
  }, [])

  // Touch-based reordering
  const touchState = useRef<{
    idx: number
    startY: number
    currentY: number
  } | null>(null)

  const handleTouchStart = useCallback((idx: number, e: React.TouchEvent) => {
    touchState.current = {
      idx,
      startY: e.touches[0].clientY,
      currentY: e.touches[0].clientY,
    }
    setDraggedIdx(idx)
  }, [])

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!touchState.current || !listRef.current) return
      touchState.current.currentY = e.touches[0].clientY

      const items = listRef.current.querySelectorAll("[data-block-item]")
      for (let i = 0; i < items.length; i++) {
        const rect = items[i].getBoundingClientRect()
        const midY = rect.top + rect.height / 2
        if (e.touches[0].clientY < midY) {
          setDragOverIdx(i)
          return
        }
      }
      setDragOverIdx(items.length - 1)
    },
    []
  )

  const handleTouchEnd = useCallback(() => {
    if (touchState.current !== null && dragOverIdx !== null) {
      handleDrop(dragOverIdx)
    }
    touchState.current = null
    setDraggedIdx(null)
    setDragOverIdx(null)
  }, [dragOverIdx, handleDrop])

  const totalMinutes = blocks.reduce((sum, b) => sum + b.duration, 0)

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold text-foreground">{"블록 구성"}</h2>
        <span className="text-sm text-muted-foreground">
          {"길게 눌러 순서 변경"}
        </span>
      </div>

      <div ref={listRef} className="flex flex-col gap-2">
        {blocks.map((block, idx) => {
          const isDragged = draggedIdx === idx
          const isDragOver = dragOverIdx === idx && draggedIdx !== idx
          const isEditing = editingId === block.id

          return (
            <div
              key={block.id}
              data-block-item
              draggable
              onDragStart={() => handleDragStart(idx)}
              onDragOver={(e) => handleDragOver(e, idx)}
              onDrop={() => handleDrop(idx)}
              onDragEnd={handleDragEnd}
              className={`relative flex items-center gap-2 rounded-xl bg-card border px-3 py-3 transition-all select-none ${
                isDragged
                  ? "opacity-50 scale-95 border-primary/40"
                  : isDragOver
                  ? "border-primary border-dashed"
                  : "border-border"
              }`}
            >
              {/* Drag handle */}
              <div
                className="flex items-center justify-center cursor-grab active:cursor-grabbing touch-none p-1"
                onTouchStart={(e) => handleTouchStart(idx, e)}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <GripIcon className="text-muted-foreground/60" />
              </div>

              {/* Block name */}
              <span className="flex-1 text-sm font-medium text-foreground">
                {block.name}
              </span>

              {/* Duration control */}
              {isEditing ? (
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => updateDuration(block.id, -5)}
                    className="flex size-7 items-center justify-center rounded-lg bg-muted text-muted-foreground hover:bg-secondary transition-colors"
                  >
                    <MinusIcon />
                  </button>
                  <span className="w-12 text-center text-sm font-semibold text-foreground tabular-nums">
                    {block.duration}{"분"}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateDuration(block.id, 5)}
                    className="flex size-7 items-center justify-center rounded-lg bg-muted text-muted-foreground hover:bg-secondary transition-colors"
                  >
                    <PlusIcon />
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingId(null)}
                    className="ml-1 text-xs font-medium text-primary"
                  >
                    {"완료"}
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setEditingId(block.id)}
                  className="transition-colors"
                >
                  <Badge
                    variant="secondary"
                    className="rounded-full text-xs font-medium bg-secondary text-secondary-foreground cursor-pointer hover:bg-primary/10"
                  >
                    {block.duration}{"분"}
                  </Badge>
                </button>
              )}

              {/* Delete button */}
              <button
                type="button"
                onClick={() => deleteBlock(block.id)}
                className="flex size-7 items-center justify-center rounded-lg text-muted-foreground/60 hover:bg-destructive/10 hover:text-destructive transition-colors"
              >
                <XIcon />
              </button>
            </div>
          )
        })}
      </div>

      {/* Summary bar */}
      <div className="mt-4 flex items-center justify-between rounded-xl bg-card border border-border px-4 py-3">
        <span className="text-sm font-medium text-muted-foreground">
          {blocks.length}{"개 \u00B7 "}
          {totalMinutes}{"분"}
        </span>
        <span className="text-sm font-semibold text-primary">
          {"07:55 \u2192 "}
          {(() => {
            const start = 7 * 60 + 55
            const end = start + totalMinutes
            const h = Math.floor(end / 60)
            const m = end % 60
            return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`
          })()}
        </span>
      </div>
    </div>
  )
}

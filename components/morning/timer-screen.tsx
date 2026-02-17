"use client"

import { useState, useEffect, useRef, useCallback } from "react"

interface RoutineBlock {
  id: string
  name: string
  duration: number
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

function SkipForwardIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polygon points="5 4 15 12 5 20 5 4" />
      <line x1="19" y1="5" x2="19" y2="19" />
    </svg>
  )
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  )
}

function PauseIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <rect x="6" y="4" width="4" height="16" rx="1" />
      <rect x="14" y="4" width="4" height="16" rx="1" />
    </svg>
  )
}

function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  )
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
}

function formatClock(date: Date): string {
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`
}

interface TimerScreenProps {
  blocks: RoutineBlock[]
  onBack: () => void
}

export function TimerScreen({ blocks, onBack }: TimerScreenProps) {
  const [currentBlockIdx, setCurrentBlockIdx] = useState(0)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [totalElapsedSeconds, setTotalElapsedSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(true)
  const [completedBlocks, setCompletedBlocks] = useState<Set<number>>(new Set())
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const currentBlock = blocks[currentBlockIdx]
  const totalDurationSeconds = currentBlock ? currentBlock.duration * 60 : 0
  const remainingSeconds = Math.max(0, totalDurationSeconds - elapsedSeconds)
  const progress = totalDurationSeconds > 0 ? Math.min(1, elapsedSeconds / totalDurationSeconds) : 0

  // Circular progress measurements
  const circleRadius = 110
  const circleCircumference = 2 * Math.PI * circleRadius
  const strokeDashoffset = circleCircumference * (1 - progress)

  const totalRoutineMinutes = blocks.reduce((sum, b) => sum + b.duration, 0)
  const remainingRoutineMinutes = blocks
    .filter((_, i) => i >= currentBlockIdx)
    .reduce((sum, b) => sum + b.duration, 0)
    - Math.floor(elapsedSeconds / 60)

  const estimatedFinish = new Date(Date.now() + Math.max(0, remainingRoutineMinutes) * 60 * 1000)

  const startTimer = useCallback(() => {
    if (intervalRef.current) return
    intervalRef.current = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1)
      setTotalElapsedSeconds((prev) => prev + 1)
    }, 1000)
  }, [])

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  useEffect(() => {
    if (isRunning) {
      startTimer()
    } else {
      stopTimer()
    }
    return stopTimer
  }, [isRunning, startTimer, stopTimer])

  const completeCurrentBlock = () => {
    if (currentBlockIdx >= blocks.length) return
    setCompletedBlocks((prev) => new Set(prev).add(currentBlockIdx))
    if (currentBlockIdx < blocks.length - 1) {
      setCurrentBlockIdx((prev) => prev + 1)
      setElapsedSeconds(0)
    } else {
      setIsRunning(false)
      stopTimer()
    }
  }

  const skipBlock = () => {
    if (currentBlockIdx < blocks.length - 1) {
      setCurrentBlockIdx((prev) => prev + 1)
      setElapsedSeconds(0)
    }
  }

  const allDone = completedBlocks.size === blocks.length

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 pb-2 pt-14">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Go back"
        >
          <ArrowLeftIcon />
        </button>
        <span className="text-sm font-medium text-muted-foreground">
          {blocks.length}{"개 블록 중 "}{currentBlockIdx + 1}{"번째"}
        </span>
        <div className="w-6" />
      </div>

      {/* Progress bar */}
      <div className="px-6 pb-6">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
            style={{
              width: `${((completedBlocks.size + progress) / blocks.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Hero timer */}
      <main className="flex flex-1 flex-col items-center px-4">
        {/* Circular progress */}
        <div className="relative flex items-center justify-center">
          <svg width="260" height="260" viewBox="0 0 260 260" className="-rotate-90">
            {/* Background ring */}
            <circle
              cx="130"
              cy="130"
              r={circleRadius}
              fill="none"
              stroke="var(--muted)"
              strokeWidth="8"
            />
            {/* Progress ring */}
            <circle
              cx="130"
              cy="130"
              r={circleRadius}
              fill="none"
              stroke="var(--primary)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circleCircumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-linear"
            />
          </svg>

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-sm font-medium text-muted-foreground">
              {currentBlock?.name ?? "완료"}
            </span>
            <span className="mt-1 text-5xl font-bold tracking-tight text-foreground tabular-nums">
              {allDone ? "00:00" : formatTime(remainingSeconds)}
            </span>
            <span className="mt-2 text-xs font-medium text-muted-foreground">
              {"진행 "}{Math.floor(totalElapsedSeconds / 60)}{"분"}
            </span>
          </div>
        </div>

        {/* Block list */}
        <div className="mt-8 w-full max-w-sm">
          <div className="flex flex-col gap-1.5">
            {blocks.map((block, idx) => {
              const isCompleted = completedBlocks.has(idx)
              const isCurrent = idx === currentBlockIdx && !allDone
              const isUpcoming = idx > currentBlockIdx

              return (
                <div
                  key={block.id}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                    isCurrent
                      ? "bg-primary/10 border border-primary/30"
                      : "bg-transparent"
                  }`}
                >
                  {/* Status indicator */}
                  <div
                    className={`flex size-6 shrink-0 items-center justify-center rounded-full ${
                      isCompleted
                        ? "bg-primary"
                        : isCurrent
                        ? "border-2 border-primary bg-primary/20"
                        : "border-2 border-muted-foreground/30"
                    }`}
                  >
                    {isCompleted && (
                      <CheckIcon className="size-3.5 text-primary-foreground" />
                    )}
                    {isCurrent && (
                      <div className="size-2 rounded-full bg-primary animate-pulse" />
                    )}
                  </div>

                  {/* Block info */}
                  <span
                    className={`flex-1 text-sm font-medium ${
                      isCompleted
                        ? "text-muted-foreground line-through"
                        : isCurrent
                        ? "text-foreground"
                        : isUpcoming
                        ? "text-muted-foreground"
                        : "text-foreground"
                    }`}
                  >
                    {block.name}
                  </span>
                  <span
                    className={`text-sm tabular-nums ${
                      isCurrent ? "font-semibold text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {block.duration}{"분"}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </main>

      {/* Bottom controls */}
      <div className="sticky bottom-0 bg-background/80 px-6 pb-10 pt-4 backdrop-blur-lg">
        <div className="mx-auto max-w-sm">
          {/* Estimated finish */}
          <p className="mb-4 text-center text-xs font-medium text-muted-foreground">
            {"예상 완료: "}{formatClock(estimatedFinish)}
          </p>

          {/* Action buttons */}
          <div className="flex items-center justify-center gap-6">
            {/* Skip button */}
            <button
              type="button"
              onClick={skipBlock}
              disabled={allDone || currentBlockIdx >= blocks.length - 1}
              className="flex size-14 items-center justify-center rounded-2xl border border-border bg-card text-muted-foreground shadow-sm transition-all hover:bg-secondary disabled:opacity-30"
              aria-label="Skip block"
            >
              <SkipForwardIcon className="size-5" />
            </button>

            {/* Play / Pause */}
            <button
              type="button"
              onClick={() => setIsRunning((prev) => !prev)}
              disabled={allDone}
              className="flex size-18 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:opacity-90 active:scale-95 disabled:opacity-40"
              aria-label={isRunning ? "Pause" : "Play"}
            >
              {isRunning ? <PauseIcon /> : <PlayIcon />}
            </button>

            {/* Complete block */}
            <button
              type="button"
              onClick={completeCurrentBlock}
              disabled={allDone}
              className="flex size-14 items-center justify-center rounded-2xl border border-border bg-card text-muted-foreground shadow-sm transition-all hover:bg-secondary disabled:opacity-30"
              aria-label="Complete block"
            >
              <CheckIcon className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sun, ClockArrowUp } from "lucide-react"

const NAV_ITEMS = [
  { href: "/", label: "루틴", icon: Sun },
  { href: "/history", label: "기록", icon: ClockArrowUp },
] as const

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="sticky bottom-0 z-50 border-t border-border bg-background/90 backdrop-blur-lg">
      <div className="mx-auto flex max-w-md items-center justify-around">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-1 flex-col items-center gap-1 py-3 text-xs font-medium transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className={`size-5 ${isActive ? "stroke-[2.5]" : ""}`} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>
      {/* Safe area padding for iOS */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  )
}

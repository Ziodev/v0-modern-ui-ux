import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface GlassCardProps {
  children: ReactNode
  className?: string
}

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative p-6 rounded-2xl",
        "glass",
        "shadow-xl shadow-black/5",
        "transition-all duration-300",
        "hover:shadow-2xl hover:shadow-black/10",
        className,
      )}
    >
      {children}
    </div>
  )
}

"use client"

import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, Package, Settings, ChevronDown, Newspaper } from "lucide-react"
import { useState } from "react"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "#" },
  {
    icon: Users,
    label: "Clientes",
    children: [
      { label: "Clientes", href: "#" },
      { label: "Mensajes de Contacto", href: "#" },
      { label: "Cotizaciones", href: "#" },
    ],
  },
  {
    icon: Newspaper,
    label: "Blog",
    active: true,
    children: [
      { label: "Categorías de Posts", href: "#" },
      { label: "Posts", href: "#", active: true },
    ],
  },
  {
    icon: Package,
    label: "Productos",
    children: [
      { label: "Categorías", href: "#" },
      { label: "Productos", href: "#" },
    ],
  },
]

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [expanded, setExpanded] = useState<string[]>(["Blog"])

  const toggleExpand = (label: string) => {
    setExpanded((prev) => (prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]))
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-72 z-40 transition-transform duration-300 ease-out",
          "glass-subtle border-r border-border/50",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-border/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-primary">
              <span className="text-primary-foreground font-bold text-lg">CA</span>
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Cable Acero</h2>
              <p className="text-xs text-muted-foreground">Panel de Gestión</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <div key={item.label}>
              <button
                onClick={() => item.children && toggleExpand(item.label)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                  "hover:bg-secondary/50 group",
                  item.active && "bg-secondary/80 text-foreground",
                )}
              >
                <item.icon
                  className={cn(
                    "w-5 h-5 transition-colors",
                    item.active ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
                  )}
                />
                <span
                  className={cn(
                    "flex-1 text-left text-sm",
                    item.active ? "text-foreground font-medium" : "text-muted-foreground group-hover:text-foreground",
                  )}
                >
                  {item.label}
                </span>
                {item.children && (
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 text-muted-foreground transition-transform duration-200",
                      expanded.includes(item.label) && "rotate-180",
                    )}
                  />
                )}
              </button>

              {/* Submenu */}
              {item.children && expanded.includes(item.label) && (
                <div className="ml-6 mt-1 space-y-1 border-l border-border/30 pl-4">
                  {item.children.map((child) => (
                    <a
                      key={child.label}
                      href={child.href}
                      className={cn(
                        "block px-3 py-2 text-sm rounded-lg transition-all duration-200",
                        "hover:bg-secondary/30",
                        child.active
                          ? "text-primary font-medium bg-primary/10"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Bottom section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border/30">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary/50 transition-all duration-200 group">
            <Settings className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            <span className="text-sm text-muted-foreground group-hover:text-foreground">Configuración</span>
          </button>
        </div>
      </aside>
    </>
  )
}

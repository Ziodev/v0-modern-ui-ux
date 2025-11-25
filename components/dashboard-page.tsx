"use client"

import { useState } from "react"
import { Sidebar } from "./sidebar"
import { GlassCard } from "./ui/glass-card"
import {
  Menu,
  Search,
  Bell,
  Moon,
  TrendingUp,
  TrendingDown,
  FileText,
  MessageSquare,
  Users,
  Package,
  ArrowUpRight,
  Clock,
  ChevronRight,
  Zap,
} from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

// Stats data
const stats = [
  {
    label: "Cotizaciones",
    value: "24",
    total: "Total: 156",
    change: "+12%",
    trend: "up",
    icon: FileText,
    color: "from-cyan-500 to-blue-600",
    glowColor: "shadow-cyan-500/20",
  },
  {
    label: "Mensajes Nuevos",
    value: "8",
    total: "Total: 342",
    change: "+5%",
    trend: "up",
    icon: MessageSquare,
    color: "from-violet-500 to-purple-600",
    glowColor: "shadow-violet-500/20",
  },
  {
    label: "Clientes Nuevos",
    value: "12",
    total: "Total: 89",
    change: "+18%",
    trend: "up",
    icon: Users,
    color: "from-emerald-500 to-teal-600",
    glowColor: "shadow-emerald-500/20",
  },
  {
    label: "Productos Activos",
    value: "47",
    total: "Total: 52",
    change: "-2%",
    trend: "down",
    icon: Package,
    color: "from-amber-500 to-orange-600",
    glowColor: "shadow-amber-500/20",
  },
]

// Client metrics
const clientMetrics = [
  {
    label: "Tasa de Conversión",
    value: "24%",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
  { label: "Con Cotizaciones", value: "38", color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
  { label: "Clientes Activos", value: "67", color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
  { label: "En Riesgo", value: "5", color: "text-rose-400", bg: "bg-rose-500/10 border-rose-500/20" },
]

// Blog stats
const blogStats = [
  { label: "Total", value: "32", color: "text-foreground" },
  { label: "Publicados", value: "28", color: "text-emerald-400" },
  { label: "Borradores", value: "4", color: "text-amber-400" },
]

// Recent activity
const recentActivity = [
  {
    type: "quote",
    title: "Nueva cotización #1234",
    time: "Hace 5 min",
    icon: FileText,
    color: "bg-cyan-500/20 text-cyan-400",
  },
  {
    type: "message",
    title: "Mensaje de Juan García",
    time: "Hace 12 min",
    icon: MessageSquare,
    color: "bg-violet-500/20 text-violet-400",
  },
  {
    type: "client",
    title: "Nuevo cliente registrado",
    time: "Hace 1 hora",
    icon: Users,
    color: "bg-emerald-500/20 text-emerald-400",
  },
  {
    type: "product",
    title: "Producto actualizado",
    time: "Hace 2 horas",
    icon: Package,
    color: "bg-amber-500/20 text-amber-400",
  },
]

// Quick actions
const quickActions = [
  { label: "Nuevo Post", icon: FileText, href: "#", color: "hover:border-cyan-500/50 hover:bg-cyan-500/5" },
  { label: "Ver Cotizaciones", icon: TrendingUp, href: "#", color: "hover:border-violet-500/50 hover:bg-violet-500/5" },
  { label: "Agregar Producto", icon: Package, href: "#", color: "hover:border-emerald-500/50 hover:bg-emerald-500/5" },
  { label: "Ver Mensajes", icon: MessageSquare, href: "#", color: "hover:border-amber-500/50 hover:bg-amber-500/5" },
]

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen animated-gradient">
      {/* Ambient background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-[150px]" />
      </div>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="lg:pl-72 min-h-screen relative">
        {/* Header */}
        <header className="sticky top-0 z-30 glass-subtle border-b border-border/30">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
                <p className="text-sm text-muted-foreground">Bienvenido al panel de administración</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="hidden md:flex items-center relative">
                <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar global..."
                  className="w-64 pl-10 bg-secondary/50 border-border/50 focus:bg-secondary/80 transition-colors"
                />
              </div>

              {/* Actions */}
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <Moon className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
              </Button>

              {/* Avatar */}
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                <span className="text-sm font-semibold text-primary-foreground">TA</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <GlassCard key={stat.label} className="group hover:scale-[1.02] cursor-pointer">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-4xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.total}</p>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg ${stat.glowColor} group-hover:scale-110 transition-transform`}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border/30 flex items-center gap-2">
                  {stat.trend === "up" ? (
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-rose-400" />
                  )}
                  <span className={stat.trend === "up" ? "text-emerald-400 text-sm" : "text-rose-400 text-sm"}>
                    {stat.change}
                  </span>
                  <span className="text-muted-foreground text-sm">vs mes anterior</span>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - 2/3 */}
            <div className="lg:col-span-2 space-y-6">
              {/* Client Metrics */}
              <GlassCard>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Métricas de Clientes</h3>
                    <p className="text-sm text-muted-foreground">Estado y conversión</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {clientMetrics.map((metric) => (
                    <div
                      key={metric.label}
                      className={`p-4 rounded-xl border ${metric.bg} transition-all hover:scale-[1.02] cursor-pointer`}
                    >
                      <p className={`text-3xl font-bold ${metric.color}`}>{metric.value}</p>
                      <p className="text-sm text-muted-foreground mt-1">{metric.label}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* Blog Posts */}
              <GlassCard>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Blog Posts</h3>
                      <p className="text-sm text-muted-foreground">Estado de publicaciones</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                    Ver todos
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {blogStats.map((stat) => (
                    <div
                      key={stat.label}
                      className="p-4 rounded-xl bg-secondary/30 border border-border/30 text-center hover:bg-secondary/50 transition-colors cursor-pointer"
                    >
                      <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                      <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Mini chart placeholder */}
                <div className="mt-6 h-32 rounded-xl bg-secondary/20 border border-border/20 flex items-center justify-center overflow-hidden relative">
                  <div className="absolute inset-0 flex items-end justify-around px-4 pb-4">
                    {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 50, 95].map((height, i) => (
                      <div
                        key={i}
                        className="w-4 rounded-t-sm bg-gradient-to-t from-primary/60 to-primary transition-all hover:from-primary hover:to-primary"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>
              </GlassCard>

              {/* Quick Actions */}
              <GlassCard>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Acciones Rápidas</h3>
                    <p className="text-sm text-muted-foreground">Accesos directos</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {quickActions.map((action) => (
                    <a
                      key={action.label}
                      href={action.href}
                      className={`flex flex-col items-center gap-3 p-4 rounded-xl border border-border/30 bg-secondary/20 transition-all ${action.color} group`}
                    >
                      <div className="w-12 h-12 rounded-xl bg-secondary/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <action.icon className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
                      </div>
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        {action.label}
                      </span>
                    </a>
                  ))}
                </div>
              </GlassCard>
            </div>

            {/* Right Column - 1/3 */}
            <div className="space-y-6">
              {/* User Info Card */}
              <GlassCard className="relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg glow-primary">
                      <span className="text-xl font-bold text-primary-foreground">TA</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Test Admin</h3>
                      <p className="text-sm text-muted-foreground">test@admin.com</p>
                      <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        SuperAdmin
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full border-border/50 hover:bg-secondary/50 bg-transparent">
                    <ArrowUpRight className="w-4 h-4 mr-2" />
                    Ver perfil
                  </Button>
                </div>
              </GlassCard>

              {/* Recent Activity */}
              <GlassCard>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Actividad Reciente</h3>
                      <p className="text-sm text-muted-foreground">Últimos movimientos</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  {recentActivity.map((activity, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-xl bg-secondary/20 border border-border/20 hover:bg-secondary/40 transition-colors cursor-pointer group"
                    >
                      <div className={`w-9 h-9 rounded-lg ${activity.color} flex items-center justify-center`}>
                        <activity.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground truncate">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
                <Button variant="ghost" className="w-full mt-4 text-primary hover:text-primary/80">
                  Ver toda la actividad
                </Button>
              </GlassCard>

              {/* Performance Card */}
              <GlassCard className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
                <div className="relative text-center py-4">
                  <div className="w-24 h-24 mx-auto mb-4 relative">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-secondary"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={`${78 * 2.64} ${100 * 2.64}`}
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="oklch(0.7 0.15 200)" />
                          <stop offset="100%" stopColor="oklch(0.75 0.12 180)" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-foreground">78%</span>
                    </div>
                  </div>
                  <h4 className="font-semibold text-foreground">Rendimiento General</h4>
                  <p className="text-sm text-muted-foreground mt-1">Excelente progreso este mes</p>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

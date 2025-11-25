"use client"

import { GlassCard } from "@/components/ui/glass-card"
import { cn } from "@/lib/utils"
import { BarChart3, Clock, Target, FileText, CheckCircle2, AlertCircle, XCircle, Sparkles } from "lucide-react"

interface LiveStatsProps {
  wordCount: number
  readingTime: number
  seoScore: number
  formData: {
    title: string
    content: string
    excerpt: string
    seoTitle: string
    seoDescription: string
    keywords: string
  }
}

export function LiveStats({ wordCount, readingTime, seoScore, formData }: LiveStatsProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400"
    if (score >= 50) return "text-amber-400"
    return "text-red-400"
  }

  const getScoreBackground = (score: number) => {
    if (score >= 80) return "from-green-500/20 to-green-500/5"
    if (score >= 50) return "from-amber-500/20 to-amber-500/5"
    return "from-red-500/20 to-red-500/5"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excelente"
    if (score >= 50) return "Mejorable"
    return "Incompleto"
  }

  const checks = [
    {
      label: "Título definido",
      completed: formData.title.length > 10,
      tip: "Mínimo 10 caracteres",
    },
    {
      label: "Contenido suficiente",
      completed: wordCount >= 300,
      tip: `${wordCount}/300 palabras`,
    },
    {
      label: "Título SEO",
      completed: formData.seoTitle.length > 10 && formData.seoTitle.length <= 60,
      tip: "10-60 caracteres",
    },
    {
      label: "Meta descripción",
      completed: formData.seoDescription.length > 50 && formData.seoDescription.length <= 160,
      tip: "50-160 caracteres",
    },
    {
      label: "Palabras clave",
      completed: formData.keywords.split(",").filter(Boolean).length >= 3,
      tip: "Mínimo 3 keywords",
    },
  ]

  return (
    <div className="space-y-6 xl:sticky xl:top-8">
      {/* SEO Score */}
      <GlassCard className="overflow-hidden">
        <div className={cn("absolute inset-0 bg-gradient-to-b opacity-50", getScoreBackground(seoScore))} />
        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-primary/10">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Puntuación SEO</h2>
              <p className="text-sm text-muted-foreground">Optimización en tiempo real</p>
            </div>
          </div>

          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <svg className="w-32 h-32 -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-muted/30"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${(seoScore / 100) * 352} 352`}
                  strokeLinecap="round"
                  className={cn("transition-all duration-500", getScoreColor(seoScore))}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={cn("text-4xl font-bold", getScoreColor(seoScore))}>{seoScore}</span>
                <span className="text-xs text-muted-foreground">de 100</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <span
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium",
                seoScore >= 80
                  ? "bg-green-500/10 text-green-400"
                  : seoScore >= 50
                    ? "bg-amber-500/10 text-amber-400"
                    : "bg-red-500/10 text-red-400",
              )}
            >
              <Sparkles className="w-4 h-4" />
              {getScoreLabel(seoScore)}
            </span>
          </div>
        </div>
      </GlassCard>

      {/* Quick Stats */}
      <GlassCard>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-accent/10">
            <BarChart3 className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Estadísticas</h2>
            <p className="text-sm text-muted-foreground">Métricas de tu contenido</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-muted/30 text-center">
            <FileText className="w-5 h-5 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{wordCount}</p>
            <p className="text-xs text-muted-foreground">Palabras</p>
          </div>
          <div className="p-4 rounded-xl bg-muted/30 text-center">
            <Clock className="w-5 h-5 text-accent mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{readingTime}</p>
            <p className="text-xs text-muted-foreground">Min. lectura</p>
          </div>
        </div>

        {wordCount < 300 && (
          <p className="text-xs text-amber-400 mt-4 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Recomendado: mínimo 300 palabras
          </p>
        )}
      </GlassCard>

      {/* SEO Checklist */}
      <GlassCard>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-primary/10">
            <CheckCircle2 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Checklist SEO</h2>
            <p className="text-sm text-muted-foreground">Optimiza tu contenido</p>
          </div>
        </div>

        <div className="space-y-3">
          {checks.map((check) => (
            <div
              key={check.label}
              className={cn(
                "flex items-center gap-3 p-3 rounded-xl transition-all duration-300",
                check.completed ? "bg-green-500/5" : "bg-muted/20",
              )}
            >
              {check.completed ? (
                <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-muted-foreground shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p
                  className={cn(
                    "text-sm font-medium truncate",
                    check.completed ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {check.label}
                </p>
                <p className="text-xs text-muted-foreground">{check.tip}</p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* AI Assistant Hint */}
      <GlassCard className="border-primary/20 glow-primary">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-primary/20">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-1">Asistente IA</h3>
            <p className="text-sm text-muted-foreground">
              Próximamente: sugerencias inteligentes para mejorar tu contenido automáticamente.
            </p>
          </div>
        </div>
      </GlassCard>
    </div>
  )
}

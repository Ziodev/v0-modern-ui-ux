"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { PostForm } from "@/components/post-form"
import { LiveStats } from "@/components/live-stats"
import { Menu, X } from "lucide-react"

export default function CreatePostPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    seoTitle: "",
    seoDescription: "",
    keywords: "",
  })

  const wordCount = formData.content.split(/\s+/).filter(Boolean).length
  const readingTime = Math.max(1, Math.ceil(wordCount / 200))
  const seoScore = calculateSeoScore(formData)

  function calculateSeoScore(data: typeof formData) {
    let score = 0
    if (data.title.length > 10) score += 20
    if (data.content.length > 300) score += 25
    if (data.seoTitle.length > 10 && data.seoTitle.length <= 60) score += 20
    if (data.seoDescription.length > 50 && data.seoDescription.length <= 160) score += 20
    if (data.keywords.split(",").filter(Boolean).length >= 3) score += 15
    return score
  }

  return (
    <div className="min-h-screen animated-gradient">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 p-2 glass rounded-xl lg:hidden"
      >
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <main className="lg:ml-72 min-h-screen p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="mb-8 pt-12 lg:pt-0">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <span className="hover:text-foreground transition-colors cursor-pointer">Posts</span>
              <span className="text-muted-foreground/50">/</span>
              <span className="text-foreground">Crear</span>
            </nav>
            <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight text-balance">Crear Post</h1>
            <p className="text-muted-foreground mt-2">Crea contenido optimizado para SEO y redes sociales</p>
          </header>

          {/* Content grid */}
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
            <PostForm formData={formData} setFormData={setFormData} />
            <LiveStats wordCount={wordCount} readingTime={readingTime} seoScore={seoScore} formData={formData} />
          </div>
        </div>
      </main>
    </div>
  )
}

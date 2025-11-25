"use client"

import type React from "react"

import { useState } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Calendar,
  Globe,
  ImageIcon,
  Type,
  FileText,
  Tag,
  Search,
  Sparkles,
  Upload,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading2,
  Heading3,
  List,
  Link,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface PostFormProps {
  formData: {
    title: string
    content: string
    excerpt: string
    seoTitle: string
    seoDescription: string
    keywords: string
  }
  setFormData: (data: any) => void
}

export function PostForm({ formData, setFormData }: PostFormProps) {
  const [isPublished, setIsPublished] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleChange = (field: string, value: string) => {
    setFormData((prev: typeof formData) => ({ ...prev, [field]: value }))
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      const reader = new FileReader()
      reader.onload = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const toolbarButtons = [
    { icon: Bold, label: "Negrita" },
    { icon: Italic, label: "Cursiva" },
    { icon: Underline, label: "Subrayado" },
    { icon: Strikethrough, label: "Tachado" },
    { icon: Heading2, label: "H2" },
    { icon: Heading3, label: "H3" },
    { icon: List, label: "Lista" },
    { icon: Link, label: "Enlace" },
  ]

  return (
    <div className="space-y-6">
      {/* Title & URL Section */}
      <GlassCard>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-primary/10">
            <Type className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Título y URL</h2>
            <p className="text-sm text-muted-foreground">La información principal de tu post</p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-foreground">
              Título
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Un título atractivo mejora el SEO y el engagement"
              className="bg-input/50 border-border/50 focus:border-primary/50 h-12"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-foreground">URL Amigable</Label>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-muted/30 border border-border/30">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">cableacero.com/blog/</span>
              <span className="text-sm text-foreground">
                {formData.title ? formData.title.toLowerCase().replace(/\s+/g, "-").slice(0, 30) : "titulo-del-post"}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">Se genera automáticamente desde el título</p>
          </div>
        </div>
      </GlassCard>

      {/* Publication Status */}
      <GlassCard>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-accent/10">
              <Sparkles className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Estado de Publicación</h2>
              <p className="text-sm text-muted-foreground">
                {isPublished ? "Tu post será visible públicamente" : "Tu post permanecerá como borrador"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "text-sm font-medium px-3 py-1 rounded-full",
                isPublished ? "bg-green-500/10 text-green-400" : "bg-amber-500/10 text-amber-400",
              )}
            >
              {isPublished ? "Publicado" : "Borrador"}
            </span>
            <Switch
              checked={isPublished}
              onCheckedChange={setIsPublished}
              className="data-[state=checked]:bg-primary"
            />
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border/30">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-foreground">Fecha de Publicación</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="datetime-local"
                  className="pl-10 bg-input/50 border-border/50 focus:border-primary/50"
                  defaultValue="2025-11-24T22:38"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-foreground">Categoría</Label>
              <Select>
                <SelectTrigger className="bg-input/50 border-border/50 focus:border-primary/50">
                  <SelectValue placeholder="Seleccionar categoría" />
                </SelectTrigger>
                <SelectContent className="glass border-border/50">
                  <SelectItem value="noticias">Noticias</SelectItem>
                  <SelectItem value="tutoriales">Tutoriales</SelectItem>
                  <SelectItem value="productos">Productos</SelectItem>
                  <SelectItem value="industria">Industria</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Featured Image */}
      <GlassCard>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-primary/10">
            <ImageIcon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Imagen Destacada</h2>
            <p className="text-sm text-muted-foreground">La imagen principal de tu post</p>
          </div>
        </div>

        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={cn(
            "relative border-2 border-dashed rounded-2xl transition-all duration-300",
            "flex flex-col items-center justify-center gap-4 p-8",
            dragActive ? "border-primary bg-primary/5" : "border-border/50 hover:border-primary/50 hover:bg-muted/20",
            imagePreview && "border-solid border-border/30",
          )}
        >
          {imagePreview ? (
            <div className="relative w-full">
              <img
                src={imagePreview || "/placeholder.svg"}
                alt="Preview"
                className="w-full h-48 object-cover rounded-xl"
              />
              <button
                onClick={() => setImagePreview(null)}
                className="absolute top-2 right-2 p-2 rounded-full glass hover:bg-destructive/20 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <div className="p-4 rounded-2xl bg-muted/30">
                <Upload className="w-8 h-8 text-muted-foreground" />
              </div>
              <div className="text-center">
                <p className="text-foreground font-medium">Arrastra una imagen aquí</p>
                <p className="text-sm text-muted-foreground mt-1">
                  o <span className="text-primary cursor-pointer hover:underline">selecciona un archivo</span>
                </p>
              </div>
              <p className="text-xs text-muted-foreground">Mínimo 1200×630px para redes sociales</p>
            </>
          )}
        </div>
      </GlassCard>

      {/* Content Editor */}
      <GlassCard>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-primary/10">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Contenido Principal</h2>
            <p className="text-sm text-muted-foreground">El cuerpo de tu post con formato enriquecido</p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap gap-1 p-2 rounded-xl bg-muted/30 mb-4">
          {toolbarButtons.map((btn) => (
            <button
              key={btn.label}
              className="p-2 rounded-lg hover:bg-secondary/50 transition-colors group"
              title={btn.label}
            >
              <btn.icon className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
            </button>
          ))}
        </div>

        <Textarea
          value={formData.content}
          onChange={(e) => handleChange("content", e.target.value)}
          placeholder="Escribe el contenido principal de tu post. Usa encabezados H2/H3 para mejor estructura SEO..."
          className="min-h-[300px] bg-input/50 border-border/50 focus:border-primary/50 resize-none"
        />
      </GlassCard>

      {/* Excerpt */}
      <GlassCard>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-accent/10">
            <FileText className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Extracto</h2>
            <p className="text-sm text-muted-foreground">Un resumen breve para listados y redes sociales</p>
          </div>
        </div>

        <Textarea
          value={formData.excerpt}
          onChange={(e) => handleChange("excerpt", e.target.value)}
          placeholder="Escribe un extracto atractivo que capture la esencia de tu post..."
          className="min-h-[100px] bg-input/50 border-border/50 focus:border-primary/50 resize-none"
          maxLength={500}
        />
        <p className="text-xs text-muted-foreground mt-2 text-right">{formData.excerpt.length}/500 caracteres</p>
      </GlassCard>

      {/* SEO Configuration */}
      <GlassCard>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-primary/10">
            <Search className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Configuración SEO</h2>
            <p className="text-sm text-muted-foreground">Optimiza tu post para motores de búsqueda</p>
          </div>
        </div>

        {/* Google Preview */}
        <div className="p-4 rounded-xl bg-white/5 border border-border/30 mb-6">
          <p className="text-xs text-muted-foreground mb-3">Vista previa en Google</p>
          <div className="space-y-1">
            <p className="text-sm text-blue-400 hover:underline cursor-pointer truncate">
              {formData.seoTitle || formData.title || "Título de tu post"}
            </p>
            <p className="text-xs text-green-400">
              cableacero.com/blog/
              {formData.title ? formData.title.toLowerCase().replace(/\s+/g, "-").slice(0, 20) : "url-del-post"}
            </p>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {formData.seoDescription ||
                "La descripción de tu post aparecerá aquí. Escribe algo atractivo para mejorar el CTR."}
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="seoTitle" className="text-foreground">
                Título SEO
              </Label>
              <span
                className={cn("text-xs", formData.seoTitle.length > 60 ? "text-destructive" : "text-muted-foreground")}
              >
                {formData.seoTitle.length}/60
              </span>
            </div>
            <Input
              id="seoTitle"
              value={formData.seoTitle}
              onChange={(e) => handleChange("seoTitle", e.target.value)}
              placeholder="Máximo 60 caracteres para resultados de búsqueda"
              className="bg-input/50 border-border/50 focus:border-primary/50"
              maxLength={70}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="seoDescription" className="text-foreground">
                Descripción SEO
              </Label>
              <span
                className={cn(
                  "text-xs",
                  formData.seoDescription.length > 160 ? "text-destructive" : "text-muted-foreground",
                )}
              >
                {formData.seoDescription.length}/160
              </span>
            </div>
            <Textarea
              id="seoDescription"
              value={formData.seoDescription}
              onChange={(e) => handleChange("seoDescription", e.target.value)}
              placeholder="Una descripción atractiva mejora el CTR en los resultados de búsqueda"
              className="min-h-[80px] bg-input/50 border-border/50 focus:border-primary/50 resize-none"
              maxLength={170}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="keywords" className="text-foreground">
              Palabras Clave
            </Label>
            <div className="relative">
              <Tag className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                id="keywords"
                value={formData.keywords}
                onChange={(e) => handleChange("keywords", e.target.value)}
                placeholder="cable acero, industria, construcción"
                className="pl-10 bg-input/50 border-border/50 focus:border-primary/50"
              />
            </div>
            <p className="text-xs text-muted-foreground">Separadas por comas (ideal: 3-5 palabras clave)</p>
          </div>
        </div>
      </GlassCard>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button className="flex-1 h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium glow-primary">
          Crear Post
        </Button>
        <Button
          variant="outline"
          className="flex-1 h-12 border-border/50 hover:bg-secondary/50 text-foreground bg-transparent"
        >
          Crear y continuar
        </Button>
        <Button
          variant="ghost"
          className="sm:flex-none h-12 px-6 hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
        >
          Cancelar
        </Button>
      </div>
    </div>
  )
}

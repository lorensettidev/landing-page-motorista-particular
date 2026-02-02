"use client"

import React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MessageCircle, Send, CheckCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export function ContactForm() {
  const [formData, setFormData] = useState({
    nome: "",
    whatsapp: "",
    data: "",
    horario: "",
    origem: "",
    destino: "",
    mensagem: ""
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const whatsappNumber = "5541996435296"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Format date from YYYY-MM-DD to DD/MM/YYYY
    const formatDate = (dateStr: string) => {
      const [year, month, day] = dateStr.split("-")
      return `${day}/${month}/${year}`
    }

    // Build WhatsApp message
    const message = `Olá! 👋
Meu nome é ${formData.nome}

Gostaria de um motorista particular.
📍 Origem: ${formData.origem}
📍 Destino: ${formData.destino}
📅 Data/Horário: ${formatDate(formData.data)} às ${formData.horario}

Fico no aguardo, obrigado!${formData.mensagem ? `\n\n📝 Obs: ${formData.mensagem}` : ""}`

    const encodedMessage = encodeURIComponent(message)
    
    setIsSubmitted(true)
    
    // Redirect to WhatsApp after showing success message
    setTimeout(() => {
      window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank")
    }, 1500)
  }

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 2) {
      return numbers.length ? `(${numbers}` : ""
    }
    if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    }
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
  }

  const handleInputChange = (field: string, value: string) => {
    if (field === "whatsapp") {
      setFormData(prev => ({ ...prev, [field]: formatPhone(value) }))
    } else {
      setFormData(prev => ({ ...prev, [field]: value }))
    }
  }

  return (
    <section id="contato" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-muted-foreground font-medium text-sm uppercase tracking-wider">
              Entre em Contato
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
              Solicitar Contato
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Preencha o formulário e entrarei em contato pelo WhatsApp.
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card border border-border rounded-2xl p-6 md:p-8"
          >
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Dados Enviados!
                  </h3>
                  <p className="text-muted-foreground">
                    Redirecionando para o WhatsApp...
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="grid md:grid-cols-2 gap-5">
                    {/* Nome */}
                    <div className="space-y-2">
                      <Label htmlFor="nome" className="text-foreground">Nome *</Label>
                      <Input
                        id="nome"
                        placeholder="Seu nome"
                        value={formData.nome}
                        onChange={(e) => handleInputChange("nome", e.target.value)}
                        required
                        className="bg-secondary border-border focus:border-foreground"
                      />
                    </div>

                    {/* WhatsApp */}
                    <div className="space-y-2">
                      <Label htmlFor="whatsapp" className="text-foreground">WhatsApp *</Label>
                      <Input
                        id="whatsapp"
                        type="tel"
                        placeholder="(11) 99999-9999"
                        value={formData.whatsapp}
                        onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                        required
                        className="bg-secondary border-border focus:border-foreground"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    {/* Data */}
                    <div className="space-y-2">
                      <Label htmlFor="data" className="text-foreground">Data *</Label>
                      <Input
                        id="data"
                        type="date"
                        value={formData.data}
                        onChange={(e) => handleInputChange("data", e.target.value)}
                        required
                        className="bg-secondary border-border focus:border-foreground"
                      />
                    </div>

                    {/* Horário */}
                    <div className="space-y-2">
                      <Label htmlFor="horario" className="text-foreground">Horário *</Label>
                      <Input
                        id="horario"
                        type="time"
                        value={formData.horario}
                        onChange={(e) => handleInputChange("horario", e.target.value)}
                        required
                        className="bg-secondary border-border focus:border-foreground"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    {/* Origem */}
                    <div className="space-y-2">
                      <Label htmlFor="origem" className="text-foreground">Origem *</Label>
                      <Input
                        id="origem"
                        placeholder="Local de partida"
                        value={formData.origem}
                        onChange={(e) => handleInputChange("origem", e.target.value)}
                        required
                        className="bg-secondary border-border focus:border-foreground"
                      />
                    </div>

                    {/* Destino */}
                    <div className="space-y-2">
                      <Label htmlFor="destino" className="text-foreground">Destino *</Label>
                      <Input
                        id="destino"
                        placeholder="Local de chegada"
                        value={formData.destino}
                        onChange={(e) => handleInputChange("destino", e.target.value)}
                        required
                        className="bg-secondary border-border focus:border-foreground"
                      />
                    </div>
                  </div>

                  {/* Mensagem */}
                  <div className="space-y-2">
                    <Label htmlFor="mensagem" className="text-foreground">Mensagem (opcional)</Label>
                    <Textarea
                      id="mensagem"
                      placeholder="Informações adicionais sobre a viagem..."
                      value={formData.mensagem}
                      onChange={(e) => handleInputChange("mensagem", e.target.value)}
                      rows={3}
                      className="bg-secondary border-border focus:border-foreground resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    size="lg"
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-6 text-lg rounded-xl transition-all duration-300 hover:shadow-lg"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Solicitar contato
                  </Button>

                  {/* WhatsApp Direct Link */}
                  <p className="text-center text-muted-foreground text-sm">
                    Ou fale diretamente pelo{" "}
                    <a 
                      href={`https://wa.me/${whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground font-medium hover:underline inline-flex items-center gap-1"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </a>
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { CheckCircle, ArrowLeft, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"
import { Suspense } from "react"

function ObrigadoContent() {
  const searchParams = useSearchParams()
  const whatsappNumber = "5541996435296"
  const defaultMessage = "Olá! Gostaria de solicitar informações sobre o serviço de motorista particular."

  // Get message from URL params or use default
  const message = searchParams.get("msg") || defaultMessage
  const encodedMessage = encodeURIComponent(message)
  const autoOpen = searchParams.get("auto") === "1"

  useEffect(() => {
    if (autoOpen) {
      // Small delay to ensure page loads first (important for Google Ads tracking)
      const timer = setTimeout(() => {
        window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank")
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [autoOpen, encodedMessage])

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-card border border-border rounded-2xl p-8 md:p-12"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-green-600" />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4"
          >
            Obrigado pelo contato!
          </motion.h1>

          {/* Message */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground mb-8"
          >
            {autoOpen
              ? "O WhatsApp está abrindo automaticamente. Caso não abra, clique no botão abaixo."
              : "Recebi sua solicitação e entrarei em contato pelo WhatsApp em breve. Aguarde, retornarei o mais rápido possível!"
            }
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-3"
          >
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodedMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button
                size="lg"
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold py-6 text-lg rounded-xl transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Falar no WhatsApp
              </Button>
            </a>

            <Link href="/">
              <Button
                variant="outline"
                size="lg"
                className="w-full py-6 text-lg rounded-xl"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Voltar ao início
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Footer text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-muted-foreground text-sm mt-6"
        >
          Henrique Lorensetti • Motorista Particular
        </motion.p>
      </div>
    </main>
  )
}

export default function ObrigadoPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-muted-foreground">Carregando...</div>
      </main>
    }>
      <ObrigadoContent />
    </Suspense>
  )
}

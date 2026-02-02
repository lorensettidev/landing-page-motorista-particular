"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="sobre" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="text-muted-foreground font-medium text-sm uppercase tracking-wider">
            Sobre o Serviço
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-3 mb-6">
            Atendimento Personalizado
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Sou motorista particular e realizo atendimentos personalizados com um único veículo, 
            oferecendo um serviço direto, sem intermediações, priorizando conforto, segurança e pontualidade.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

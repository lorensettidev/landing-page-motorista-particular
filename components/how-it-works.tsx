"use client"

import { Smartphone, CalendarDays, Car, Handshake } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const steps = [
  {
    icon: Smartphone,
    title: "Contato direto pelo WhatsApp",
    description: "Fale comigo diretamente, sem intermediários"
  },
  {
    icon: CalendarDays,
    title: "Agendamento prévio",
    description: "Combine data, horário e detalhes da viagem"
  },
  {
    icon: Car,
    title: "Atendimento com veículo próprio",
    description: "Carro limpo, revisado e confortável"
  },
  {
    icon: Handshake,
    title: "Serviço personalizado",
    description: "Atendimento sob medida para você"
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

export function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="como-funciona" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-muted-foreground font-medium text-sm uppercase tracking-wider">
            Simples e Prático
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            Como Funciona
          </h2>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              variants={itemVariants}
              className="group relative p-6 rounded-2xl bg-card border border-border hover:border-foreground/20 transition-all duration-300 text-center"
            >
              {/* Step Number */}
              <div className="absolute -top-3 left-6 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
                {index + 1}
              </div>
              
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-4 group-hover:bg-foreground/10 transition-colors duration-300">
                <step.icon className="w-7 h-7 text-foreground" />
              </div>
              
              {/* Content */}
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

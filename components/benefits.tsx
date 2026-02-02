"use client"

import { User, Clock, Car, CalendarCheck, UserCheck } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const benefits = [
  {
    icon: User,
    title: "Atendimento direto com o motorista",
    description: "Sem intermediários, você fala diretamente comigo"
  },
  {
    icon: Clock,
    title: "Pontualidade e compromisso",
    description: "Chego sempre antes do horário combinado"
  },
  {
    icon: Car,
    title: "Veículo sempre limpo e revisado",
    description: "Carro em perfeitas condições para sua viagem"
  },
  {
    icon: CalendarCheck,
    title: "Serviço sob agendamento",
    description: "Planeje sua viagem com antecedência"
  },
  {
    icon: UserCheck,
    title: "Discrição e respeito ao cliente",
    description: "Privacidade e profissionalismo em cada trajeto"
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

export function Benefits() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="diferenciais" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-muted-foreground font-medium text-sm uppercase tracking-wider">
            Por que me escolher
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            Diferenciais do Serviço
          </h2>
        </motion.div>

        {/* Benefits List */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-3xl mx-auto space-y-4"
        >
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.title}
              variants={itemVariants}
              className="group flex items-start gap-4 p-5 rounded-xl bg-card border border-border hover:border-foreground/20 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <benefit.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

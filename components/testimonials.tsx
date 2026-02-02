"use client"

import { Quote } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const testimonials = [
  {
    name: "Mariana S.",
    content: "Atendimento direto e muito pontual. Recomendo!"
  },
  {
    name: "Ricardo L.",
    content: "Motorista educado e serviço confiável. Sempre que preciso, já sei quem chamar."
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

export function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="depoimentos" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-muted-foreground font-medium text-sm uppercase tracking-wider">
            Depoimentos
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            O Que Dizem os Clientes
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.name}
              variants={itemVariants}
              className="relative p-6 rounded-2xl bg-card border border-border"
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-muted-foreground/30 mb-4" />
              
              {/* Content */}
              <p className="text-foreground leading-relaxed mb-4">
                {`"${testimonial.content}"`}
              </p>
              
              {/* Author */}
              <p className="font-medium text-muted-foreground">
                — {testimonial.name}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

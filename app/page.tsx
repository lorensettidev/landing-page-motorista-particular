import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { HowItWorks } from "@/components/how-it-works"
import { Benefits } from "@/components/benefits"
import { ContactForm } from "@/components/contact-form"
import { Testimonials } from "@/components/testimonials"
import { Footer, WhatsAppFloat } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <HowItWorks />
      <Benefits />
      <ContactForm />
      <Testimonials />
      <Footer />
      <WhatsAppFloat />
    </main>
  )
}

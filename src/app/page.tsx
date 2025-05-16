"use client"

import { useRef, Suspense, lazy } from "react"
import { useScroll } from "framer-motion"
import dynamic from "next/dynamic"
import HeroSection from "@/components/home/hero-section"
import LoadingFallback from "@/components/loading-fallback"

// Lazy load components that are not needed for initial render
const ParallaxBackground = dynamic(() => import("@/components/about-page/parallax-background"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-background"></div>,
})

// Lazy load below-the-fold sections
const ServicesSection = lazy(() => import("@/components/home/services-section"))
const ProcessSection = lazy(() => import("@/components/home/process-section"))
const StatsSection = lazy(() => import("@/components/home/stats-section"))
const TestimonialsSection = lazy(() => import("@/components/home/testimonials-section"))
const AboutSection = lazy(() => import("@/components/home/about-section"))
const CtaSection = lazy(() => import("@/components/home/cta-section"))

export default function Home() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Função para lidar com o clique no botão CTA
  const handleCtaClick = () => {
    const phoneNumber = "553599574977"
    const defaultMessage = "Olá, gostaria de mais informações!"
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`

    window.open(whatsappUrl, "_blank")
  }

  return (
    <div ref={containerRef} className="min-h-screen overflow-hidden">
      {/* Parallax Background - apenas para seções abaixo do hero */}
      <div className="relative z-0 mt-screen">
        <ParallaxBackground scrollYProgress={scrollYProgress} />
      </div>

      <div className="relative z-10">
        <HeroSection onCtaClick={handleCtaClick} />
        <Suspense fallback={<LoadingFallback />}>
          <ServicesSection />
          <ProcessSection />
          <StatsSection />
          <TestimonialsSection />
          <AboutSection />
          <CtaSection onCtaClick={handleCtaClick} />
        </Suspense>
      </div>
    </div>
  )
}

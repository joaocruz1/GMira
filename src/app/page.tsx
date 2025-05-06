"use client"

import { useRef, Suspense, lazy } from "react"
import { useScroll } from "framer-motion"
import dynamic from "next/dynamic"
import HeroSection from "@/components/about-page/hero-section"
import LoadingFallback from "@/components/loading-fallback"

// Lazy load components that are not needed for initial render
const ParallaxBackground = dynamic(() => import("@/components/about-page/parallax-background"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-black"></div>,
})

// Lazy load below-the-fold sections
const ServicesSection = lazy(() => import("@/components/about-page/services-section"))
const AboutSection = lazy(() => import("@/components/about-page/about-section"))
const ForWhoSection = lazy(() => import("@/components/about-page/for-who-section"))
const CtaSection = lazy(() => import("@/components/about-page/cta-section"))
const Footer = lazy(() => import("@/components/about-page/footer"))

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
    <div ref={containerRef} className="min-h-screen bg-black text-white overflow-hidden">
      {/* Parallax Background */}
      <ParallaxBackground scrollYProgress={scrollYProgress} />
      <div className="relative z-10">
        <HeroSection onCtaClick={handleCtaClick} scrollYProgress={scrollYProgress} />
        <Suspense fallback={<LoadingFallback />}>
          <ServicesSection />
          <AboutSection />
          <ForWhoSection onCtaClick={handleCtaClick} />
          <CtaSection onCtaClick={handleCtaClick} />
          <Footer />
        </Suspense>
      </div>
    </div>
  )
}

"use client"

import { useRef } from "react"
import { useScroll } from "framer-motion"
import HeroSection from "@/components/landing-page/hero-section"
import ServicesSection from "@/components/landing-page/services-section"
import CtaSection from "@/components/landing-page/cta-section"
import ForWhoSection from "@/components/landing-page/for-who-section"
import AboutSection from "@/components/landing-page/about-section"
import ParallaxBackground from "@/components/landing-page/parallax-background"


export default function Home() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Função para lidar com o clique no botão CTA
  const handleCtaClick = () => {
    const phoneNumber = "553599574977"; 
    const defaultMessage = "Olá, gostaria de mais informações!"; 
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;
    
    window.open(whatsappUrl, "_blank"); 
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white overflow-hidden">
      {/* Parallax Background */}
      <ParallaxBackground scrollYProgress={scrollYProgress} />
      <div className="relative z-10">
        <HeroSection onCtaClick={handleCtaClick} scrollYProgress={scrollYProgress} />
        <ServicesSection onCtaClick={handleCtaClick} />
        <ForWhoSection onCtaClick={handleCtaClick} />
        <AboutSection />
        <CtaSection onCtaClick={handleCtaClick} />
      </div>
    </div>
  )
}

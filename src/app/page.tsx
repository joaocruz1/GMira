"use client"

import { useRef } from "react"
import { useScroll } from "framer-motion"
import HeroSection from "@/components/about-page/hero-section"
import ServicesSection from "@/components/about-page/services-section"
import CtaSection from "@/components/about-page/cta-section"
import ForWhoSection from "@/components/about-page/for-who-section"
import AboutSection from "@/components/about-page/about-section"
import ParallaxBackground from "@/components/about-page/parallax-background"
import Footer from "@/components/landing-page/footer"

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
        <AboutSection />
        <ServicesSection />
        <ForWhoSection onCtaClick={handleCtaClick} />
        <CtaSection onCtaClick={handleCtaClick} />
        <Footer /> 
      </div>
    </div>
  )
  
}

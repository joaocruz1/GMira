"use client"

import { useRef, Suspense, lazy } from "react"
import { useScroll } from "framer-motion"
import dynamic from "next/dynamic"
import PageHeader from "@/components/layout/page-header"
import LoadingFallback from "@/components/loading-fallback"
import CtaBanner from "@/components/shared/cta-banner"

// Lazy load components
const ParallaxBackground = dynamic(() => import("@/components/about-page/parallax-background"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-black"></div>,
})

const AboutDetail = lazy(() => import("@/components/about-page/about-detail"))
const Values = lazy(() => import("@/components/about-page/values"))
const Journey = lazy(() => import("@/components/about-page/journey"))
const Skills = lazy(() => import("@/components/about-page/skills"))

export default function AboutPage() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white overflow-hidden">
      {/* Parallax Background */}
      <ParallaxBackground scrollYProgress={scrollYProgress} />

      <div className="relative z-10">
        <PageHeader
          title="SOBRE MIM"
          subtitle="Conheça mais sobre quem está por trás da GMira Marketing Digital e minha jornada no mundo do marketing."
        />

        <Suspense fallback={<LoadingFallback />}>
          <AboutDetail />
          <Values />
          <Journey />
          <Skills />
          <CtaBanner
            title="VAMOS TRABALHAR JUNTOS?"
            subtitle="Entre em contato para conversarmos sobre como posso ajudar seu negócio a crescer no digital."
          />
        </Suspense>
      </div>
    </div>
  )
}

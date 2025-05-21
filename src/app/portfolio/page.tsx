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

const PortfolioGrid = lazy(() => import("@/components/portfolio-page/portfolio-grid"))
const ClientLogos = lazy(() => import("@/components/portfolio-page/client-logos"))
const CaseStudies = lazy(() => import("@/components/portfolio-page/case-studies"))

export default function PortfolioPage() {
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
          title="PORTFÓLIO"
          subtitle="Conheça alguns dos projetos e resultados que alcançamos para nossos clientes."
        />

        <Suspense fallback={<LoadingFallback />}>
          <ClientLogos />
          <PortfolioGrid />
          <CaseStudies />
          <CtaBanner
            title="QUER SER O PRÓXIMO CASE DE SUCESSO?"
            subtitle="Entre em contato e vamos transformar sua presença digital juntos."
          />
        </Suspense>
      </div>
    </div>
  )
}

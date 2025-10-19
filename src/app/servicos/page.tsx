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

const ServicesDetail = lazy(() => import("@/components/services-page/services-detail"))
const ServiceProcess = lazy(() => import("@/components/services-page/service-process"))
const Pricing = lazy(() => import("@/components/services-page/pricing"))
const Testimonials = lazy(() => import("@/components/services-page/testimonials"))
const FAQ = lazy(() => import("@/components/services-page/faq"))

export default function ServicesPage() {
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
          title="SERVIÇOS"
          subtitle="Conheça as soluções completas de marketing digital que a GMira oferece para impulsionar seu negócio."
        />

        <Suspense fallback={<LoadingFallback />}>
          <ServicesDetail />
          <ServiceProcess />
          <Pricing />
          <Testimonials />
          <FAQ />
          <CtaBanner
            title="PRONTO PARA TRANSFORMAR SUA PRESENÇA DIGITAL?"
            subtitle="Vamos criar uma estratégia personalizada para o seu negócio."
          />
        </Suspense>
      </div>
    </div>
  )
}

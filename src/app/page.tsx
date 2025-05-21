"use client"

import { useRef } from "react"
import { useScroll } from "framer-motion"
import dynamic from "next/dynamic"
import { Suspense } from "react"
import LoadingFallback from "@/components/loading-fallback"

// Lazy load components
const ParallaxBackground = dynamic(() => import("@/components/home/parallax-background"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-black"></div>,
})

const HeroSection = dynamic(() => import("@/components/home/hero-section"), {
  loading: () => <LoadingFallback />,
})

const StatsSection = dynamic(() => import("@/components/home/stats-section"), {
  loading: () => <LoadingFallback />,
})

const FeaturesShowcase = dynamic(() => import("@/components/home/features-showcase"), {
  loading: () => <LoadingFallback />,
})

const ServicesCarousel = dynamic(() => import("@/components/home/services-carousel"), {
  loading: () => <LoadingFallback />,
})

const TestimonialsSlider = dynamic(() => import("@/components/home/testimonials-slider"), {
  loading: () => <LoadingFallback />,
})

const CtaSection = dynamic(() => import("@/components/home/cta-section"), {
  loading: () => <LoadingFallback />,
})

const ProcessSection = dynamic(() => import("@/components/home/process-section"), {
  loading: () => <LoadingFallback />,
})

const PortfolioPreview = dynamic(() => import("@/components/home/portfolio-preview"), {
  loading: () => <LoadingFallback />,
})


export default function Home() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  return (
    <>
      <div ref={containerRef} className="min-h-screen bg-black text-white overflow-hidden">
        {/* Parallax Background */}
        <ParallaxBackground scrollYProgress={scrollYProgress} />

        <div className="relative z-20">
          <Suspense fallback={<LoadingFallback />}>
            <HeroSection />
            <div className="relative z-20">
              <StatsSection />
              <ProcessSection />
              <FeaturesShowcase />
              <ServicesCarousel />
              <PortfolioPreview />
              <TestimonialsSlider />
              <CtaSection />
            </div>
          </Suspense>
        </div>
      </div>
    </>
  )
}

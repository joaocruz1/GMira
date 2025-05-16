"use client"

import { useRef } from "react"
import { useScroll } from "framer-motion"
import ParallaxBackground from "@/components/about-page/parallax-background"
import Hero from "@/components/home/hero"
import Footer from "@/components/about-page/footer"

export default function Home() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white overflow-hidden">
      {/* Parallax Background */}
      <ParallaxBackground scrollYProgress={scrollYProgress} />
      <Hero />
      <div className="relative z-10">
        <Footer /> 
      </div>
    </div>
  )
}

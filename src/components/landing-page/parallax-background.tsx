"use client"

import { memo, useEffect, useState, useCallback, useRef } from "react"
import { motion, useTransform, type MotionValue } from "framer-motion"

interface ParallaxBackgroundProps {
  scrollYProgress: MotionValue<number>
}

function ParallaxBackground({ scrollYProgress }: ParallaxBackgroundProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMounted, setIsMounted] = useState(false)
  const [isLowPerfDevice, setIsLowPerfDevice] = useState(false)

  // Parallax transformations based on scroll - reduced intensity
  const backgroundY1 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const backgroundY2 = useTransform(scrollYProgress, [0, 1], ["0%", "10%"])
  const backgroundY3 = useTransform(scrollYProgress, [0, 1], ["0%", "5%"])

  // Performance detection
  useEffect(() => {
    setIsMounted(true)

    // Simple performance detection based on device memory and processor count
    // This is a basic heuristic and could be improved
    const memory = (navigator as any).deviceMemory || 4
    const processors = navigator.hardwareConcurrency || 4

    setIsLowPerfDevice(memory < 4 || processors < 4)
  }, [])

  // Heavily throttled mouse movement handler
  const lastUpdateTimeRef = useRef(0)

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      // Only update mouse position every 100ms on low-perf devices, 50ms on higher-end
      const now = Date.now()
      if (now - lastUpdateTimeRef.current > (isLowPerfDevice ? 100 : 50)) {
        lastUpdateTimeRef.current = now

        // Reduce calculation complexity
        const x = e.clientX / window.innerWidth - 0.5
        const y = e.clientY / window.innerHeight - 0.5

        setMousePosition({ x, y })
      }
    },
    [isLowPerfDevice],
  )

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [handleMouseMove])

  if (!isMounted) return null

  // For very low-performance devices, render a simplified background
  if (isLowPerfDevice) {
    return (
      <>
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Simplified background with minimal effects */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(138,43,226,0.1),transparent_70%)]" />
          <div className="absolute inset-0 bg-[url('/grid.png')] bg-repeat opacity-5" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
        </div>
        <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-black/40 via-transparent to-black/70" />
      </>
    )
  }

  return (
    <>
      {/* Fixed background elements with parallax effect */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Deep background layer - reduced effects */}
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(138,43,226,0.15),transparent_70%)]"
          style={{
            y: backgroundY1,
            x: mousePosition.x * -10, // Reduced intensity
            willChange: "transform", // Hint for browser optimization
          }}
        />

        {/* Middle background layer - reduced number of shapes and blur intensity */}
        <motion.div
          className="absolute inset-0"
          style={{
            y: backgroundY2,
            x: mousePosition.x * -15, // Reduced intensity
            willChange: "transform",
          }}
        >
          {/* Single animated shape with reduced blur and animation complexity */}
          <motion.div
            className="absolute top-[20%] left-[10%] w-64 h-64 rounded-full bg-purple-900/10 blur-xl"
            animate={{
              scale: [1, 1.1, 1], // Reduced scale change
              opacity: [0.2, 0.3, 0.2], // Reduced opacity change
            }}
            transition={{
              duration: 10, // Slower animation
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        </motion.div>

        {/* Foreground layer with grid - simplified */}
        <motion.div
          className="absolute inset-0"
          style={{
            y: backgroundY3,
            x: mousePosition.x * -20, // Reduced intensity
            willChange: "transform",
          }}
        >
          {/* Grid overlay with reduced opacity */}
          <div className="absolute inset-0 bg-[url('/grid.png')] bg-repeat opacity-5" />
        </motion.div>

        {/* Top gradient line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      </div>

      {/* Overlay gradient for better text readability */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-black/40 via-transparent to-black/70" />
    </>
  )
}

export default memo(ParallaxBackground)

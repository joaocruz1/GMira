"use client"

import { memo, useEffect, useState } from "react"
import { motion, useTransform, type MotionValue } from "framer-motion"

interface ParallaxBackgroundProps {
  scrollYProgress: MotionValue<number>
}

function ParallaxBackground({ scrollYProgress }: ParallaxBackgroundProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMounted, setIsMounted] = useState(false)

  // Parallax transformations based on scroll
  const backgroundY1 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const backgroundY2 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const backgroundY3 = useTransform(scrollYProgress, [0, 1], ["0%", "10%"])

  // Handle mouse movement for additional parallax effect
  useEffect(() => {
    setIsMounted(true)

    const handleMouseMove = (e: MouseEvent) => {
      // Throttle mouse movement calculations
      requestAnimationFrame(() => {
        setMousePosition({
          x: e.clientX / window.innerWidth - 0.5,
          y: e.clientY / window.innerHeight - 0.5,
        })
      })
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  if (!isMounted) return null

  return (
    <>
      {/* Fixed background elements with parallax effect */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Deep background layer */}
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(138,43,226,0.2),transparent_70%)]"
          style={{
            y: backgroundY1,
            x: mousePosition.x * -20,
          }}
        />

        {/* Middle background layer with geometric shapes */}
        <motion.div
          className="absolute inset-0"
          style={{
            y: backgroundY2,
            x: mousePosition.x * -30,
          }}
        >
          {/* Animated geometric shapes - reduced number for better performance */}
          <motion.div
            className="absolute top-[20%] left-[10%] w-64 h-64 rounded-full bg-purple-900/10 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />

          <motion.div
            className="absolute bottom-[20%] left-[30%] w-80 h-80 rounded-full bg-fuchsia-900/10 blur-3xl"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 12,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: 2,
            }}
          />
        </motion.div>

        {/* Foreground layer with grid */}
        <motion.div
          className="absolute inset-0"
          style={{
            y: backgroundY3,
            x: mousePosition.x * -40,
          }}
        >
          {/* Grid overlay */}
          <div className="absolute inset-0 bg-[url('/grid.png')] bg-repeat opacity-10" />
        </motion.div>

        {/* Top gradient line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      </div>

      {/* Overlay gradient for better text readability */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-black/40 via-transparent to-black/70" />
    </>
  )
}

export default memo(ParallaxBackground)

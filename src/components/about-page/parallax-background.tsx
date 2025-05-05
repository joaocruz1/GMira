"use client"

import { useEffect, useState } from "react"
import { motion, useTransform, type MotionValue } from "framer-motion"

interface ParallaxBackgroundProps {
  scrollYProgress: MotionValue<number>
}

export default function ParallaxBackground({ scrollYProgress }: ParallaxBackgroundProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Parallax transformations based on scroll
  const backgroundY1 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const backgroundY2 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const backgroundY3 = useTransform(scrollYProgress, [0, 1], ["0%", "10%"])

  // Handle mouse movement for additional parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

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
          {/* Animated geometric shapes */}
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
            className="absolute top-[50%] right-[15%] w-96 h-96 rounded-full bg-indigo-900/10 blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: 1,
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

        {/* Foreground layer with grid and particles */}
        <motion.div
          className="absolute inset-0"
          style={{
            y: backgroundY3,
            x: mousePosition.x * -40,
          }}
        >
          {/* Grid overlay */}
          <div className="absolute inset-0 bg-[url('/grid.png')] bg-repeat opacity-10" />

          {/* Particles */}
          <div className="absolute inset-0">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 3,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Top gradient line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      </div>

      {/* Overlay gradient for better text readability */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-black/40 via-transparent to-black/70" />
    </>
  )
}

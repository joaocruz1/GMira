"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

interface FadeInProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  y?: number
  x?: number
  once?: boolean
}

export default function FadeIn({ children, delay = 0, duration = 0.5, y = 0, x = 0, once = true }: FadeInProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once })
  const [hasAnimated, setHasAnimated] = useState(false)

  // Skip animation for users who prefer reduced motion
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener("change", handleChange)

    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  useEffect(() => {
    if (isInView) {
      setHasAnimated(true)
    }
  }, [isInView])

  // If user prefers reduced motion, render without animation
  if (prefersReducedMotion) {
    return <>{children}</>
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, x }}
      animate={isInView || hasAnimated ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y, x }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

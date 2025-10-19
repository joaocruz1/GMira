"use client"

import type React from "react"
import { useEffect, useRef, useState, memo, useMemo, useCallback } from "react"
import { motion, useInView } from "framer-motion"

interface FadeInProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  y?: number
  x?: number
  once?: boolean
}

const FadeIn = memo(function FadeIn({ 
  children, 
  delay = 0, 
  duration = 0.5, 
  y = 0, 
  x = 0, 
  once = true 
}: FadeInProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once })
  const [hasAnimated, setHasAnimated] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  const handleMediaQueryChange = useCallback(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)
  }, [])

  useEffect(() => {
    // Check for reduced motion preference only on client side
    if (typeof window === "undefined") return

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = handleMediaQueryChange
    mediaQuery.addEventListener("change", handleChange)

    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [handleMediaQueryChange])

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [isInView, hasAnimated])

  // Memoizar configurações de animação
  const animationConfig = useMemo(() => ({
    initial: { opacity: 0, y, x },
    animate: (isInView || hasAnimated) ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y, x },
    transition: { duration, delay, ease: "easeOut" as const }
  }), [y, x, isInView, hasAnimated, duration, delay])

  // If user prefers reduced motion, render without animation
  if (prefersReducedMotion) {
    return <>{children}</>
  }

  return (
    <motion.div
      ref={ref}
      initial={animationConfig.initial}
      animate={animationConfig.animate}
      transition={animationConfig.transition}
    >
      {children}
    </motion.div>
  )
})

export default FadeIn

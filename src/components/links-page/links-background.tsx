"use client"

import { motion } from "framer-motion"

export default function LinksBackground() {
  return (
    <>
      {/* Fixed background elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Deep background gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(138,43,226,0.15),transparent_70%)]" />

        {/* Animated geometric shapes */}
        <motion.div
          className="absolute top-[10%] left-[10%] w-64 h-64 rounded-full bg-purple-900/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        <motion.div
          className="absolute bottom-[20%] right-[10%] w-80 h-80 rounded-full bg-fuchsia-900/10 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 1,
          }}
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('/grid.png')] bg-repeat opacity-5" />

        {/* Subtle gradient lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      </div>

      {/* Overlay gradient for better text readability */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-[#0c0117]/60 via-[#0c0117]/40 to-[#0c0117]/80" />
    </>
  )
}

"use client"

import { memo } from "react"
import { motion } from "framer-motion"

interface PageHeaderProps {
  title: string
  subtitle?: string
  gradient?: boolean
}

function PageHeader({ title, subtitle, gradient = true }: PageHeaderProps) {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/5 to-black" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-600/10 blur-3xl"
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        <motion.div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-fuchsia-600/10 blur-3xl"
          animate={{
            y: [0, 30, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 1,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`text-4xl md:text-6xl font-bold mb-6 ${
            gradient ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500" : "text-white"
          }`}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "100px" }}
          transition={{ duration: 1, delay: 0.4 }}
          className="h-1 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full mx-auto mt-8"
        />
      </div>
    </section>
  )
}

export default memo(PageHeader)

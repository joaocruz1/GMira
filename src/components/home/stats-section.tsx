"use client"

import type React from "react"

import { memo, useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"

function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section ref={sectionRef} className="py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/5 to-black" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 relative z-30"
        >
          <div className="bg-black/70 backdrop-blur-md py-6 rounded-xl inline-block px-10 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Impactos <span className="text-purple-400">Reais</span> Para seu Negócio
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gradient-to-br from-purple-900/30 to-black/60 backdrop-blur-sm rounded-xl p-6 border border-purple-900/30 hover:border-purple-600/50 transition-all duration-300"
            >
              <div className="mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-fuchsia-600 text-white">
                  {stat.icon}
                </div>
              </div>

              <CountUp value={stat.value} suffix={stat.suffix} duration={2} startOnView={isInView}>
                {({ displayValue }) => <h3 className="text-3xl md:text-4xl font-bold mb-2">{displayValue}</h3>}
              </CountUp>

              <p className="text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-12 text-center text-sm text-gray-500"
        >
          * Baseado em resultados médios de nossos clientes nos últimos 12 meses.
        </motion.div>
      </div>
    </section>
  )
}

interface CountUpProps {
  value: number
  suffix?: string
  duration?: number
  startOnView: boolean
  children: ({ displayValue }: { displayValue: string }) => React.ReactNode
}

const CountUp = memo(({ value, suffix = "", duration = 2, startOnView, children }: CountUpProps) => {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!startOnView) return

    let startTime: number | null = null
    let animationFrame: number

    const updateValue = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)

      setDisplayValue(Math.floor(progress * value))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateValue)
      }
    }

    animationFrame = requestAnimationFrame(updateValue)

    return () => cancelAnimationFrame(animationFrame)
  }, [startOnView, value, duration])

  return children({ displayValue: `${displayValue}${suffix}` })
})

CountUp.displayName = "CountUp"

const stats = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    value: 200,
    suffix: "%",
    label: "Aumento em Engajamento",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    value: 300,
    suffix: "%",
    label: "ROI Médio",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
    value: 50,
    suffix: "+",
    label: "Clientes Satisfeitos",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
        />
      </svg>
    ),
    value: 150,
    suffix: "%",
    label: "Aumento em Conversões",
  },
]

export default memo(StatsSection)

"use client"

import { memo, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

function CtaSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section ref={sectionRef} className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(138,43,226,0.15),transparent_70%)]" />

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

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-purple-900/30 to-black/80 backdrop-blur-sm p-10 md:p-16 rounded-3xl border border-purple-900/40 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Pronto para Transformar sua
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500 mt-2">
                  Presença Digital?
                </span>
              </h2>

              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Comece hoje mesmo e dê o primeiro passo para conquistar resultados reais no marketing digital.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-6"
            >
              <Link href="/start">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 
                    text-white px-10 py-8 rounded-xl shadow-lg transition-all duration-300"
                >
                  <span className="text-xl font-bold tracking-wide">COMECE AGORA</span>
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </Link>

              <p className="text-sm text-gray-400 mt-4">Sem compromisso. Cancele quando quiser.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(CtaSection)

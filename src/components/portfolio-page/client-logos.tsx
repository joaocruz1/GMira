"use client"

import { memo } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

function ClientLogos() {
  return (
    <section className="py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/5 to-black" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            MARCAS QUE <span className="text-purple-500">CONFIAM</span> EM NÓS
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {clientLogos.map((logo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1 }}
              className="w-32 md:w-40 h-20 relative grayscale hover:grayscale-0 transition-all duration-300"
            >
              <Image
                src={logo || "/placeholder.svg"}
                alt={`Cliente ${index + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 128px, 160px"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const clientLogos = [
  "/placeholder.svg?height=80&width=160",
  "/placeholder.svg?height=80&width=160",
  "/placeholder.svg?height=80&width=160",
  "/placeholder.svg?height=80&width=160",
  "/placeholder.svg?height=80&width=160",
  "/placeholder.svg?height=80&width=160",
]

export default memo(ClientLogos)

"use client"

import { memo } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

function Footer() {
  return (
    <footer className="bg-black/80 backdrop-blur-md border-t border-white/5 py-8">
      <div className="container mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Image
            src="/6.png"
            alt="GMira Marketing Digital"
            width={100}
            height={30}
            className="h-12 w-auto mx-auto mb-4"
            loading="lazy"
          />
          <p className="text-gray-400">
            © {new Date().getFullYear()} GMira Marketing Digital. Todos os direitos reservados.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default memo(Footer)

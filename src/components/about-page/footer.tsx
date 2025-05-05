"use client"
import { motion } from "framer-motion"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-black/80 backdrop-blur-md border-t border-white/5 py-8">
      <div className="container mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Image
            src="/fave.ico"
            alt="GMira Marketing Digital"
            width={100}
            height={30}
            className="h-12 w-auto mx-auto mb-4"
          />
          <p className="text-gray-400">
            © {new Date().getFullYear()} GMira Marketing Digital. Todos os direitos reservados.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

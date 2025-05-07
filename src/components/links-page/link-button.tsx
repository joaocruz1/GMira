"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Instagram, Linkedin, ExternalLink, MessageSquare } from "lucide-react"

interface LinkButtonProps {
  href: string
  icon: "instagram" | "linkedin" | "behance" | "whatsapp"
  label: string
  description: string
}

export default function LinkButton({ href, icon, label, description }: LinkButtonProps) {
  // Função para renderizar o ícone correto
  const renderIcon = () => {
    switch (icon) {
      case "instagram":
        return <Instagram className="h-5 w-5" />
      case "linkedin":
        return <Linkedin className="h-5 w-5" />
      case "behance":
        return <ExternalLink className="h-5 w-5" />
      case "whatsapp":
        return <MessageSquare className="h-5 w-5" />
      default:
        return <ExternalLink className="h-5 w-5" />
    }
  }

  // Função para obter a cor de fundo baseada no ícone
  const getGradient = () => {
    switch (icon) {
      case "instagram":
        return "from-pink-500 to-purple-600"
      case "linkedin":
        return "from-blue-600 to-blue-800"
      case "behance":
        return "from-blue-500 to-indigo-700"
      case "whatsapp":
        return "from-green-500 to-green-700"
      default:
        return "from-purple-600 to-fuchsia-600"
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`w-full bg-gradient-to-r ${getGradient()} hover:brightness-110 text-white px-6 py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center group`}
      >
        <div className="bg-white/20 p-2 rounded-lg mr-4">{renderIcon()}</div>

        <div className="flex-1">
          <div className="font-bold text-lg">{label}</div>
          <div className="text-sm text-white/80">{description}</div>
        </div>

        <div className="ml-2 transition-transform group-hover:translate-x-1">
          <ExternalLink className="h-4 w-4" />
        </div>
      </Link>
    </motion.div>
  )
}

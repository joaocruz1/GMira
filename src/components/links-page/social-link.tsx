"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Instagram, Linkedin, FileImage, MessageSquare, Twitter, Youtube, Github, Facebook } from "lucide-react"

type SocialType = "instagram" | "linkedin" | "behance" | "whatsapp" | "twitter" | "youtube" | "github" | "facebook"

interface SocialLinkProps {
  type: SocialType
  username: string
  href: string
}

export default function SocialLink({ type, username, href }: SocialLinkProps) {
  // Função para renderizar o ícone correto
  const renderIcon = () => {
    switch (type) {
      case "instagram":
        return <Instagram className="h-6 w-6" />
      case "linkedin":
        return <Linkedin className="h-6 w-6" />
      case "behance":
        return <FileImage className="h-6 w-6" />
      case "whatsapp":
        return <MessageSquare className="h-6 w-6" />
      case "twitter":
        return <Twitter className="h-6 w-6" />
      case "youtube":
        return <Youtube className="h-6 w-6" />
      case "github":
        return <Github className="h-6 w-6" />
      case "facebook":
        return <Facebook className="h-6 w-6" />
      default:
        return <Instagram className="h-6 w-6" />
    }
  }

  // Função para obter a cor de fundo baseada no ícone
  const getBgColor = () => {
    switch (type) {
      case "instagram":
        return "bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400"
      case "linkedin":
        return "bg-[#0077B5]"
      case "behance":
        return "bg-[#1769FF]"
      case "whatsapp":
        return "bg-[#25D366]"
      case "twitter":
        return "bg-[#1DA1F2]"
      case "youtube":
        return "bg-[#FF0000]"
      case "github":
        return "bg-[#333333]"
      case "facebook":
        return "bg-[#1877F2]"
      default:
        return "bg-purple-600"
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className="flex flex-col items-center"
    >
      <Link href={href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
        <div
          className={`${getBgColor()} w-16 h-16 rounded-full flex items-center justify-center shadow-lg mb-2 hover:shadow-xl transition-shadow duration-300`}
        >
          {renderIcon()}
        </div>
        <span className="text-sm text-gray-300">{username}</span>
      </Link>
    </motion.div>
  )
}

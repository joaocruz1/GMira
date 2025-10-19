"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ChevronRight, Layout, Target, Users, Mail } from "lucide-react"

type IconType = "layout" | "target" | "users" | "mail"

interface ServiceCardProps {
  title: string
  description: string
  icon: IconType
  href: string
}

export default function ServiceCard({ title, description, icon, href }: ServiceCardProps) {
  // Função para renderizar o ícone correto
  const renderIcon = () => {
    switch (icon) {
      case "layout":
        return <Layout className="h-6 w-6" />
      case "target":
        return <Target className="h-6 w-6" />
      case "users":
        return <Users className="h-6 w-6" />
      case "mail":
        return <Mail className="h-6 w-6" />
      default:
        return <Layout className="h-6 w-6" />
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Link href={href} className="block">
        <div className="bg-[#1a0b2e] border border-purple-900/50 rounded-xl p-5 flex items-start gap-4 hover:border-purple-500/50 transition-colors duration-300">
          <div className="text-purple-500 mt-1">{renderIcon()}</div>

          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">{title}</h3>
            <p className="text-sm text-gray-400">{description}</p>
          </div>

          <div className="text-purple-500">
            <ChevronRight className="h-5 w-5" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

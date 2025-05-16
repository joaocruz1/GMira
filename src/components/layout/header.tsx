"use client"

import { useState, useEffect, memo } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import ThemeToggle from "../theme/theme-toggle"

function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Detectar scroll para mudar o estilo do header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Fechar menu ao mudar de página
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 dark:bg-black/80 backdrop-blur-md shadow-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-50">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <Image src="/GMira.svg" alt="GMira Logo" width={120} height={40} className="h-10 w-auto" priority />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink key={item.path} href={item.path} label={item.label} isActive={pathname === item.path} />
            ))}

            <ThemeToggle />

            <Button
              size="sm"
              onClick={() => window.open("/contato", "_self")}
              className="gradient-primary gradient-primary-hover text-white rounded-lg shadow-glow hover:shadow-glow-hover transition-all duration-300"
            >
              Fale Comigo
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />

            <button
              className="relative z-50"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6 text-indigo-900 dark:text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6 text-indigo-900 dark:text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-white/95 dark:bg-black/95 backdrop-blur-md flex flex-col items-center justify-center z-40 md:hidden"
              >
                <nav className="flex flex-col items-center space-y-8">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <Link
                        href={item.path}
                        className={`text-xl font-bold transition-colors duration-300 ${
                          pathname === item.path
                            ? "text-purple-700 dark:text-purple-400"
                            : "text-indigo-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Button
                      size="lg"
                      onClick={() => window.open("/contato", "_self")}
                      className="gradient-primary gradient-primary-hover text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 mt-4"
                    >
                      Fale Comigo
                    </Button>
                  </motion.div>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}

// Componente de link de navegação com animação
const NavLink = memo(
  ({
    href,
    label,
    isActive,
  }: {
    href: string
    label: string
    isActive: boolean
  }) => {
    return (
      <Link
        href={href}
        className={`relative font-medium text-sm transition-colors duration-300 ${
          isActive
            ? "text-purple-700 dark:text-purple-400"
            : "text-indigo-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400"
        }`}
      >
        {label}
        {isActive && (
          <motion.div
            layoutId="activeNavIndicator"
            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-full"
            transition={{ duration: 0.3 }}
          />
        )}
      </Link>
    )
  },
)

NavLink.displayName = "NavLink"

const navItems = [
  { path: "/", label: "Home" },
  { path: "/servicos", label: "Serviços" },
  { path: "/sobre", label: "Sobre" },
  { path: "/portfolio", label: "Portfólio" },
  { path: "/blog", label: "Blog" },
]

export default memo(Header)

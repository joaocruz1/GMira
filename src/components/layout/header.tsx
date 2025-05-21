"use client"

import { useState, useEffect, memo } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

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

  // Impedir rolagem quando o menu estiver aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md shadow-lg py-3" : "bg-transparent py-5"
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
            <Button
              size="sm"
              onClick={() => window.open("/start", "_self")}
              className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white rounded-lg shadow-glow hover:shadow-glow-hover transition-all duration-300"
            >
              Mude seu Negócio
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative z-50"
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
                  <X className="h-6 w-6 text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="fixed top-0 left-0 right-0 bottom-0 h-screen bg-black/95 backdrop-blur-lg flex flex-col items-center justify-center z-40 md:hidden overflow-y-auto"
              >
                <nav className="flex flex-col items-center space-y-8 py-20">
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
                          pathname === item.path ? "text-purple-500" : "text-white hover:text-purple-400"
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
                      onClick={() => window.open("/start", "_self")}
                      className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white rounded-lg shadow-glow hover:shadow-glow-hover transition-all duration-300 mt-4"
                    >
                      Mude seu Negócio
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
// Vamos substituir por uma implementação sem o layoutId para evitar o bug visual
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
          isActive ? "text-purple-500" : "text-white hover:text-purple-400"
        }`}
      >
        {label}
        <div
          className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full transition-all duration-300 ${
            isActive ? "opacity-100 w-full" : "opacity-0 w-0"
          }`}
        />
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

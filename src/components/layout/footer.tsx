"use client"

import { memo } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Instagram, Facebook, Linkedin, Mail, Phone, MapPin } from "lucide-react"

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black/80 backdrop-blur-md border-t border-white/5 pt-16 pb-8 transition-colors duration-300 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Logo e Descrição */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Image
                src="/img/logos/logoWhite.png"
                alt="GMira Marketing Digital"
                width={150}
                height={50}
                className="h-12 w-auto mb-4"
                loading="lazy"
              />
              <p className=":text-gray-400 text-sm">
                Estratégia, conteúdo e tráfego pago para negócios que querem crescer no digital com resultados
                mensuráveis.
              </p>
            </motion.div>
          </div>

          {/* Links Rápidos */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-white font-bold mb-4 text-lg"
            >
              Links Rápidos
            </motion.h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={link.href}
                    className=" text-gray-400 hover:text-purple-400 transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Serviços */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-white font-bold mb-4 text-lg"
            >
              Serviços
            </motion.h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <motion.li
                  key={service}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href="/servicos"
                    className= "text-gray-400 hover:text-purple-400 transition-colors duration-300 text-sm"
                  >
                    {service}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-white font-bold mb-4 text-lg"
            >
              Contato
            </motion.h3>
            <ul className="space-y-3">
              {contactInfo.map((info, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2"
                >
                  <span className="text-white">{info.icon}</span>
                  <a
                    href={info.href}
                    className="text-gray-400 hover:text-purple-400 transition-colors duration-300 text-sm"
                  >
                    {info.text}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex justify-center space-x-6 mb-8"
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -3 }}
              className="bg-white dark:bg-purple-900/30 p-3 rounded-full hover:bg-purple-50 dark:hover:bg-purple-800/50 transition-colors duration-300 shadow-sm"
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center border-t border-gray-100 dark:border-white/5 pt-8"
        >
          <p className="text-indigo-500 dark:text-gray-500 text-sm">
            © {currentYear} GMira Marketing Digital. Todos os direitos reservados.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/servicos", label: "Serviços" },
  { href: "/sobre", label: "Sobre" },
  { href: "/portfolio", label: "Portfólio" },
  { href: "/contato", label: "Contato" },
]

const services = [
  "Gestão de Redes Sociais",
  "Gestão de Tráfego",
  "Design Gráfico",
  "Criação de Conteúdo",
  "Landing Pages",
  "Planejamento Estratégico",
]

const contactInfo = [
  {
    icon: <Mail className="h-4 w-4" />,
    text: "contato@gmiramkt.com",
    href: "mailto:contato@gmiramkt.com",
  },
  {
    icon: <Phone className="h-4 w-4" />,
    text: "+55 35 9957-4977",
    href: "tel:+5535999574977",
  },
  {
    icon: <MapPin className="h-4 w-4" />,
    text: "Pouso Alegre, MG",
    href: "https://maps.google.com/?q=Pouso+Alegre,MG",
  },
]

const socialLinks = [
  {
    icon: <Instagram className="h-5 w-5 text-primary" />,
    href: "https://instagram.com/gmiramkt",
  },
  {
    icon: <Facebook className="h-5 w-5 text-primary" />,
    href: "https://facebook.com/gmiramkt",
  },
  {
    icon: <Linkedin className="h-5 w-5 text-primary" />,
    href: "https://linkedin.com/in/gustavomira",
  },
]

export default memo(Footer)

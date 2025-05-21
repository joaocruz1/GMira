"use client"

import { memo, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Interactive particle effect for hero section
  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full screen
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Resize handler
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener("resize", handleResize)

    // Particle configuration
    const particlesArray: Particle[] = []
    const numberOfParticles = Math.min(100, Math.floor(window.innerWidth / 20))

    // Mouse position for interactivity
    const mouse = {
      x: 0,
      y: 0,
    }
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.x
      mouse.y = e.y
    }
    window.addEventListener("mousemove", handleMouseMove)

    // Particle class
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.color = `rgba(${Math.floor(Math.random() * 100) + 156}, ${Math.floor(
          Math.random() * 50,
        )}, ${Math.floor(Math.random() * 100) + 156}, ${Math.random() * 0.5 + 0.3})`
      }

      update() {
        // Movement
        this.x += this.speedX
        this.y += this.speedY

        // Boundary check
        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height

        // Mouse interactivity
        const dx = this.x - mouse.x
        const dy = this.y - mouse.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < 60) {
          const angle = Math.atan2(dy, dx)
          const force = (60 - distance) / 60
          this.speedX -= force * Math.cos(angle) * 0.1
          this.speedY -= force * Math.sin(angle) * 0.1
        }
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particles
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle())
    }

    // Animation function
    function animate() {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Connect particles with lines
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x
          const dy = particlesArray[a].y - particlesArray[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            const opacity = 1 - distance / 100
            ctx.strokeStyle = `rgba(150, 100, 255, ${opacity * 0.2})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
            ctx.stroke()
          }
        }
      }

      // Update and draw particles
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
      }

      requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center z-10 overflow-hidden">
      {/* Interactive background canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      <div className="container mx-auto px-4 py-20 md:py-32 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-8 text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
              Marketing Digital
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 mt-2">
                Com Resultados Reais
              </span>
            </h1>

            <motion.p
              className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Transforme sua presença online com estratégias personalizadas que realmente funcionam. Sem promessas
              vazias, apenas resultados mensuráveis.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <Link href="/start">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 
                    text-white px-8 py-6 rounded-xl shadow-glow hover:shadow-glow-hover transition-all duration-300"
                >
                  <span className="text-lg font-bold">Começar Agora</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Link href="/portfolio">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-purple-500/30 text-white hover:bg-purple-900/20 px-8 py-6 rounded-xl"
                >
                  <span className="text-lg font-medium">Ver Portfólio</span>
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative"
          >
            <div className="relative h-[500px] w-full">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-fuchsia-600/20 rounded-2xl blur-3xl"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.5, 0.7, 0.5],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />

              <div className="relative h-full w-full flex items-center justify-center">
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                  className="relative w-4/5"
                >
                  <Image
                    src="/marketing-hero.svg"
                    alt="Marketing Digital"
                    width={600}
                    height={600}
                    className="w-full h-auto"
                    priority
                  />
                </motion.div>
              </div>
            </div>

            <motion.div
              className="absolute -bottom-8 -right-8 bg-gradient-to-br from-purple-600 to-fuchsia-600 rounded-2xl p-4 shadow-xl"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <div className="flex items-center gap-3">
                <div className="bg-white rounded-full p-2">
                  <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="text-white">
                  <p className="font-bold">+150%</p>
                  <p className="text-xs opacity-80">Aumento Médio em Conversões</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -top-4 -left-4 bg-gradient-to-br from-fuchsia-600 to-purple-600 rounded-2xl p-4 shadow-xl"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <div className="flex items-center gap-3">
                <div className="bg-white rounded-full p-2">
                  <svg className="w-8 h-8 text-fuchsia-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                  </svg>
                </div>
                <div className="text-white">
                  <p className="font-bold">ROI 300%</p>
                  <p className="text-xs opacity-80">Retorno sobre Investimento</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default memo(HeroSection)

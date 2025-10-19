"use client"

import { memo, useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  // Configurar vídeo de fundo
  useEffect(() => {
    const video = videoRef.current
    if (video) {
      // Configurações do vídeo para melhor performance
      video.muted = true
      video.loop = true
      video.playsInline = true
      
      const handleLoadedData = () => {
        setIsVideoLoaded(true)
        // Tentar reproduzir o vídeo após carregar
        const playPromise = video.play()
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log("Autoplay bloqueado, aguardando interação do usuário:", error)
            // Adicionar listener para primeira interação do usuário
            const handleUserInteraction = () => {
              video.play().catch(console.error)
              document.removeEventListener('click', handleUserInteraction)
              document.removeEventListener('touchstart', handleUserInteraction)
              document.removeEventListener('keydown', handleUserInteraction)
            }
            document.addEventListener('click', handleUserInteraction, { once: true })
            document.addEventListener('touchstart', handleUserInteraction, { once: true })
            document.addEventListener('keydown', handleUserInteraction, { once: true })
          })
        }
      }

      const handleCanPlay = () => {
        setIsVideoLoaded(true)
      }

      const handleError = (error: Event) => {
        console.warn("Erro ao carregar vídeo:", error)
        setIsVideoLoaded(false)
      }

      // Adicionar listeners
      video.addEventListener('loadeddata', handleLoadedData)
      video.addEventListener('canplay', handleCanPlay)
      video.addEventListener('error', handleError)
      
      // Forçar carregamento do vídeo
      video.load()
      
      return () => {
        video.removeEventListener('loadeddata', handleLoadedData)
        video.removeEventListener('canplay', handleCanPlay)
        video.removeEventListener('error', handleError)
      }
    }
  }, [])

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
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover scale-105"
          muted
          loop
          playsInline
          preload="metadata"
          onContextMenu={(e) => e.preventDefault()}
          style={{
            objectFit: 'cover',
            pointerEvents: 'none'
          }}
        >
          <source src="/VIDEOALVO.mp4" type="video/mp4" />
          Seu navegador não suporta vídeos HTML5.
        </video>
        
        {/* Fallback background caso vídeo não carregue */}
        {!isVideoLoaded && (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(138,43,226,0.2),transparent_70%)]" />
        )}
        
        {/* Overlay escuro para melhor contraste do texto */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Interactive background canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-[1]" />

      <div className="container mx-auto px-4 py-20 md:py-32 z-20 relative">
        <div className="flex justify-center lg:justify-start">
          <motion.div
            className="space-y-8 text-center lg:text-left max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
              SUA MARCA
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 mt-2">
                NO ALVO CERTO!
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
              className="flex justify-center lg:justify-start"
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
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default memo(HeroSection)

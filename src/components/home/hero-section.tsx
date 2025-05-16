"use client"

import { memo, useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight, Play, Pause } from "lucide-react"

interface HeroSectionProps {
  onCtaClick: () => void
}

function HeroSection({ onCtaClick }: HeroSectionProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    // Autoplay vídeo quando componente montar
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Autoplay prevented:", error)
        setIsVideoPlaying(false)
      })
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.pause()
      }
    }
  }, [])

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsVideoPlaying(!isVideoPlaying)
    }
  }

  // Pulse animation for the CTA button
  const pulseVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.03, 1],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop" as const,
      },
    },
  }

  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.2,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  }

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        {isMounted && (
          <>
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster="/video-poster.png"
            >
              <source src="/background-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Video Controls */}
            <button
              onClick={toggleVideo}
              className="absolute bottom-8 right-8 z-10 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300"
              aria-label={isVideoPlaying ? "Pause background video" : "Play background video"}
            >
              {isVideoPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </button>
          </>
        )}

        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-start">
        <div className="max-w-3xl">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <Image
                src="/GMira.svg"
                alt="GMira Logo"
                width={180}
                height={60}
                className="w-auto h-16 md:h-20"
                priority
              />
            </motion.div>

            <motion.h1
              custom={0}
              initial="hidden"
              animate="visible"
              variants={textVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6"
            >
              SUA MARCA NO{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500 relative inline-block">
                ALVO
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                  className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-purple-400 to-fuchsia-500 rounded-full"
                ></motion.span>
              </span>{" "}
              CERTO!
            </motion.h1>

            <motion.p
              custom={1}
              initial="hidden"
              animate="visible"
              variants={textVariants}
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl"
            >
              Estratégia, conteúdo e tráfego pago para negócios que querem crescer no digital com resultados
              mensuráveis.
            </motion.p>

            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={textVariants}
              className="text-lg text-gray-400 mb-10"
            >
              Gestão de redes sociais, anúncios, design e vídeos com um plano sob medida para seu negócio.
            </motion.p>

            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={textVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div variants={pulseVariants} initial="initial" animate="animate">
                <Button
                  size="lg"
                  onClick={onCtaClick}
                  className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white text-lg px-8 py-7 rounded-xl shadow-glow hover:shadow-glow-hover transition-all duration-300 border border-purple-500/30"
                >
                  <span className="text-xl font-bold tracking-wide">FALE COMIGO</span>
                  <ChevronRight className="ml-2 h-6 w-6" />
                </Button>
              </motion.div>

              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white/30 text-lg px-8 py-7 rounded-xl transition-all duration-300"
              >
                <span className="text-xl font-medium tracking-wide">CONHEÇA OS SERVIÇOS</span>
              </Button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
            className="w-8 h-14 rounded-full border-2 border-white/30 flex justify-center pt-2"
          >
            <motion.div
              animate={{ height: [6, 12, 6] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
              className="w-1 bg-white/60 rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default memo(HeroSection)

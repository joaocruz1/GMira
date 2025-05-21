"use client"

import { memo } from "react"
import { motion } from "framer-motion"

function Skills() {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/5 to-black" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            MINHAS <span className="text-purple-500">HABILIDADES</span>
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Competências que utilizo para criar estratégias eficazes e gerar resultados para meus clientes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Habilidades Técnicas */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-8 flex items-center">
              <span className="bg-purple-900/50 p-2 rounded-lg mr-3">🛠️</span>
              Habilidades Técnicas
            </h3>

            <div className="space-y-6">
              {technicalSkills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-white">{skill.name}</span>
                    <span className="text-purple-400">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-purple-900/30 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="h-full bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Habilidades Interpessoais */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-8 flex items-center">
              <span className="bg-purple-900/50 p-2 rounded-lg mr-3">🤝</span>
              Habilidades Interpessoais
            </h3>

            <div className="space-y-6">
              {softSkills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-white">{skill.name}</span>
                    <span className="text-purple-400">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-purple-900/30 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="h-full bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Certificações */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 max-w-5xl mx-auto"
        >
          <h3 className="text-2xl font-bold mb-8 flex items-center">
            <span className="bg-purple-900/50 p-2 rounded-lg mr-3">🏆</span>
            Certificações
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-purple-900/20 to-black/60 backdrop-blur-sm p-6 rounded-xl border border-purple-900/30"
              >
                <h4 className="font-bold text-lg mb-2">{cert.name}</h4>
                <p className="text-gray-400 text-sm mb-2">{cert.issuer}</p>
                <p className="text-purple-400 text-sm">{cert.year}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const technicalSkills = [
  { name: "Gestão de Redes Sociais", level: 95 },
  { name: "Meta Ads", level: 90 },
  { name: "Google Ads", level: 85 },
  { name: "Design Gráfico", level: 80 },
  { name: "Copywriting", level: 90 },
  { name: "Análise de Dados", level: 85 },
]

const softSkills = [
  { name: "Comunicação", level: 95 },
  { name: "Criatividade", level: 90 },
  { name: "Resolução de Problemas", level: 85 },
  { name: "Gestão de Projetos", level: 80 },
  { name: "Pensamento Estratégico", level: 90 },
  { name: "Adaptabilidade", level: 85 },
]

const certifications = [
  { name: "Meta Blueprint", issuer: "Meta", year: "2023" },
  { name: "Google Ads", issuer: "Google", year: "2022" },
  { name: "Marketing Digital", issuer: "Rock Content", year: "2022" },
  { name: "Analytics", issuer: "Google", year: "2021" },
]

export default memo(Skills)

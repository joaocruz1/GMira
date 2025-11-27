"use client"

import { influencers } from "@/data/influencers"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useState } from "react"

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedNiche, setSelectedNiche] = useState("all")

  const filteredInfluencers = influencers.filter((inf) => {
    const matchesSearch =
      inf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inf.city.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesNiche = selectedNiche === "all" || inf.niche === selectedNiche
    return matchesSearch && matchesNiche
  })

  const niches = ["all", ...new Set(influencers.map((inf) => inf.niche))]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-black text-white pt-24 pb-6 px-6 md:pt-28 md:pb-8 md:px-8">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        {/* Header Section */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-white/10">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold text-lg">
                  GM
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    GM Faces
                  </h1>
                  <p className="text-sm text-gray-400">Painel de Administração</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 flex-wrap justify-end">
              <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                <Link href="/gmfaces">← Ver Catálogo</Link>
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                + Novo Influenciador
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-white/5 border-white/10 hover:bg-white/8 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <span className="text-xl">👥</span>
                  Total de Influenciadores
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-2">
                  <div className="text-4xl font-bold text-white">{influencers.length}</div>
                  <span className="text-xs text-green-400 mb-1">+2 este mês</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 hover:bg-white/8 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <span className="text-xl">⏳</span>
                  Solicitações Pendentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-2">
                  <div className="text-4xl font-bold text-yellow-400">3</div>
                  <span className="text-xs text-red-400 mb-1">Atender hoje</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 hover:bg-white/8 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <span className="text-xl">⭐</span>
                  Nicho Mais Popular
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-2">
                  <div className="text-4xl font-bold text-green-400">Beleza</div>
                  <span className="text-xs text-gray-400 mb-1">45% do catálogo</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Filter and Search Section */}
        <div className="space-y-4">
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="🔍 Buscar por nome ou cidade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
            />
            <div className="flex gap-2 flex-wrap">
              {niches.map((niche) => (
                <button
                  key={niche}
                  onClick={() => setSelectedNiche(niche)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                    selectedNiche === niche
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30"
                      : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
                  }`}
                >
                  {niche === "all" ? "Todos" : niche}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Influencers Table */}
        <Card className="bg-white/5 border-white/10">
          <CardHeader className="pb-4 border-b border-white/10">
            <CardTitle className="flex items-center justify-between">
              <span>Catálogo de Influenciadores</span>
              <span className="text-xs font-normal text-gray-400 bg-white/5 px-3 py-1 rounded-full">
                {filteredInfluencers.length} resultado{filteredInfluencers.length !== 1 ? "s" : ""}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-gray-400">
                    <th className="py-4 px-4 font-semibold text-left">Influenciador</th>
                    <th className="py-4 px-4 font-semibold text-left">Nicho</th>
                    <th className="py-4 px-4 font-semibold text-left">Localização</th>
                    <th className="py-4 px-4 font-semibold text-left">Alcance</th>
                    <th className="py-4 px-4 font-semibold text-right">Valor Cliente</th>
                    <th className="py-4 px-4 font-semibold text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredInfluencers.length > 0 ? (
                    filteredInfluencers.map((influencer) => (
                      <tr key={influencer.id} className="hover:bg-white/5 transition-all duration-200 group">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center text-xs font-bold text-purple-300 border border-purple-500/30 group-hover:border-purple-500/60 transition-colors">
                              {influencer.name.substring(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <div className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                                {influencer.name}
                              </div>
                              <div className="text-xs text-gray-500">{influencer.gender}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
                            {influencer.niche}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-gray-300">📍 {influencer.city}</td>
                        <td className="py-4 px-4 text-gray-300">{influencer.reach}</td>
                        <td className="py-4 px-4 text-right">
                          <span className="font-bold text-green-400">{influencer.price_client}</span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 text-purple-400 hover:text-purple-300 hover:bg-purple-400/10 rounded"
                            >
                              ✎
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded"
                            >
                              ✕
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-8 px-4 text-center text-gray-400">
                        Nenhum influenciador encontrado com os filtros aplicados
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Habilita compressão de imagens
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
  // Habilita compressão de resposta
  compress: true,
  // Otimizações para produção
  swcMinify: true,
  // Configuração de cache para assets estáticos
  staticPageGenerationTimeout: 120,
  // Configuração para CDN
  assetPrefix: process.env.NEXT_PUBLIC_CDN_URL || '',
  // Otimizações para produção
  productionBrowserSourceMaps: false,
  // Configuração para otimização de fontes
  optimizeFonts: true,
  // Configuração para otimização de scripts
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig

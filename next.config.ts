/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuração para transpilação de pacotes
  transpilePackages: [],
  // Habilita compressão de imagens com otimizações avançadas
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: false, // Habilitar otimização de imagens
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 ano
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
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
    optimizePackageImports: ['lucide-react', '@radix-ui/react-slot'],
    scrollRestoration: true,
    legacyBrowsers: false,
    browsersListForSwc: true,
  },
  // Headers de segurança e performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig

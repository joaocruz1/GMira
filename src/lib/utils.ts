import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Cache para evitar re-criação de elementos DOM
let dnsPrefetchCache: Set<string> = new Set()

export const optimizeResourceLoading = (): void => {
  if (typeof window === "undefined") return

  // Prefetch de DNS para recursos externos com cache
  const domains = [
    "fonts.googleapis.com", 
    "fonts.gstatic.com",
    "www.google-analytics.com",
    "www.googletagmanager.com"
  ]
  
  domains.forEach((domain) => {
    if (dnsPrefetchCache.has(domain)) return
    
    const link = document.createElement("link")
    link.rel = "dns-prefetch"
    link.href = `//${domain}`
    document.head.appendChild(link)
    dnsPrefetchCache.add(domain)
  })
}

// Função para debounce otimizada
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Função para throttle otimizada
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Função para lazy loading de imagens
export const lazyLoadImage = (img: HTMLImageElement): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (img.complete) {
      resolve()
      return
    }
    
    img.onload = () => resolve()
    img.onerror = reject
  })
}

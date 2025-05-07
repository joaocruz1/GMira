import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const optimizeResourceLoading = (): void => {
  if (typeof window === "undefined") return

  // Prefetch de DNS para recursos externos
  const domains = ["fonts.googleapis.com", "fonts.gstatic.com"]
  domains.forEach((domain) => {
    const link = document.createElement("link")
    link.rel = "dns-prefetch"
    link.href = `//${domain}`
    document.head.appendChild(link)
  })
}

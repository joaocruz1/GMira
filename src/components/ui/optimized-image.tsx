"use client"

import Image, { type ImageProps } from "next/image"
import { useState, useCallback, memo } from "react"
import { cn } from "@/lib/utils"

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  fallbackSrc?: string
  className?: string
  placeholder?: "blur" | "empty"
  blurDataURL?: string
  onLoadComplete?: () => void
  onError?: () => void
}

const OptimizedImage = memo(function OptimizedImage({
  src,
  alt,
  fallbackSrc = "/placeholder.svg",
  className,
  placeholder = "empty",
  blurDataURL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==",
  onLoadComplete,
  onError,
  priority = false,
  loading = "lazy",
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  const handleLoad = useCallback(() => {
    setIsLoaded(true)
    onLoadComplete?.()
  }, [onLoadComplete])

  const handleError = useCallback(() => {
    if (!hasError && fallbackSrc) {
      setImgSrc(fallbackSrc)
      setHasError(true)
      onError?.()
    }
  }, [hasError, fallbackSrc, onError])

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        {...props}
        src={imgSrc}
        alt={alt}
        priority={priority}
        loading={loading}
        placeholder={placeholder}
        blurDataURL={placeholder === "blur" ? blurDataURL : undefined}
        className={cn(
          "transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
          className
        )}
        onLoad={handleLoad}
        onError={handleError}
      />
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse" />
      )}
    </div>
  )
})

export default OptimizedImage

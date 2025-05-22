"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface FadeInSectionProps {
  children: React.ReactNode
  threshold?: number
  delay?: number
}

export default function FadeInSection({ children, threshold = 0.1, delay = 0 }: FadeInSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold])

  return (
    <div
      ref={ref}
      className={cn("transition-opacity duration-1000 ease-in-out", isVisible ? "opacity-100" : "opacity-0")}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

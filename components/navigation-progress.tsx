"use client"

import { useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { Loader2 } from 'lucide-react'
import { cn } from "@/lib/utils"

export function NavigationProgress() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isNavigating, setIsNavigating] = useState(false)
  
  // When the route changes, show loading indicator
  useEffect(() => {
    setIsNavigating(true)
    
    // Hide loading indicator after a short delay
    const timeout = setTimeout(() => {
      setIsNavigating(false)
    }, 500) // Adjust timing as needed
    
    return () => clearTimeout(timeout)
  }, [pathname, searchParams])
  
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm transition-opacity duration-300",
        isNavigating ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      aria-hidden={!isNavigating}
      aria-label="Loading"
      role="status"
    >
      <div className="bg-background border rounded-full shadow-lg px-6 py-4 flex items-center gap-3">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <span className="text-sm font-medium">Loading...</span>
      </div>
    </div>
  )
}
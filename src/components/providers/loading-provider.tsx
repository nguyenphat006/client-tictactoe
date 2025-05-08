'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

interface LoadingContextType {
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Start loading when route changes
    setIsLoading(true)

    // Create a promise that resolves when the page is loaded
    const loadPromise = new Promise<void>((resolve) => {
      if (document.readyState === 'complete') {
        resolve()
      } else {
        window.addEventListener('load', () => resolve())
      }
    })

    // Wait for the page to load
    loadPromise.then(() => {
      // Add a small delay to ensure smooth transition
      setTimeout(() => {
        setIsLoading(false)
      }, 400)
    })

    return () => {
      // Cleanup
      setIsLoading(false)
    }
  }, [pathname, searchParams])

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
      {isLoading && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      )}
    </LoadingContext.Provider>
  )
}

export function useLoading() {
  const context = useContext(LoadingContext)
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  return context
} 
'use client'
import { RingLoader } from 'react-spinners'
import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function LoadingSpinner({ className, size = 'md' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 30,
    md: 50,
    lg: 80
  }

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <RingLoader
        color="#E69A00"
        size={sizeClasses[size]}
        speedMultiplier={1}
        loading={true}
      />
    </div>
  )
} 
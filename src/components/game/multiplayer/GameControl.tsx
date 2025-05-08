import { Button } from '@/components/ui/button'
import { RotateCcw, Flag, RefreshCw } from 'lucide-react'

interface GameControlProps {
  onReset: () => void
  onSurrender: () => void
  onRematch: () => void
  gameStatus: 'playing' | 'won' | 'draw'
}

export function GameControl({ 
  onReset, 
  onSurrender, 
  onRematch,
  gameStatus 
}: GameControlProps) {
  return (
    <div className="flex justify-center gap-4 mt-8">
      {gameStatus === 'playing' ? (
        <>
          <Button
            variant="outline"
            size="lg"
            onClick={onReset}
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Game
          </Button>

          <Button
            variant="destructive"
            size="lg"
            onClick={onSurrender}
            className="flex items-center gap-2"
          >
            <Flag className="w-4 h-4" />
            Surrender
          </Button>
        </>
      ) : (
        <Button
          variant="default"
          size="lg"
          onClick={onRematch}
          className="flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Rematch
        </Button>
      )}
    </div>
  )
} 
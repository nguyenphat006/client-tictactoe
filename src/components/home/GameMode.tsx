'use client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { SinglePlayerModal } from './SinglePlayerModal'
import { TournamentModal } from './TournamentModal'

interface ModeSelectCardProps {
  mode: 'online' | 'offline' | 'tournament'
}

export default function ModeSelectCard({ mode }: ModeSelectCardProps) {
  const router = useRouter()
  const [isSinglePlayerModalOpen, setIsSinglePlayerModalOpen] = useState(false)
  const [isTournamentModalOpen, setIsTournamentModalOpen] = useState(false)

  const handleClick = () => {
    if (mode === 'online') {
      router.push('/sign-in')
    } else if (mode === 'tournament') {
      setIsTournamentModalOpen(true)
    } else {
      setIsSinglePlayerModalOpen(true)
    }
  }

  const getButtonContent = () => {
    switch (mode) {
      case 'online':
        return '🎮 Chơi Online'
      case 'offline':
        return '🤖 Chơi Offline'
      case 'tournament':
        return '🏆 Tham Gia Giải Đấu'
      default:
        return ''
    }
  }

  const getButtonVariant = () => {
    switch (mode) {
      case 'online':
        return 'default'
      case 'tournament':
        return 'secondary'
      default:
        return 'outline'
    }
  }

  return (
    <>
      <Button
        onClick={handleClick}
        className="w-full py-6 text-lg font-semibold capitalize"
        variant={getButtonVariant()}
      >
        {getButtonContent()}
      </Button>
      
      <SinglePlayerModal 
        open={isSinglePlayerModalOpen} 
        onOpenChange={setIsSinglePlayerModalOpen} 
      />

      <TournamentModal
        open={isTournamentModalOpen}
        onOpenChange={setIsTournamentModalOpen}
      />
    </>
  )
}

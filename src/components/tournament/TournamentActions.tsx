'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { showToast } from '@/components/ui/toastify'

interface TournamentActionsProps {
  tournamentId: string
}

// Mock data - sẽ được thay thế bằng API call
const mockUser = {
  isHost: false,
  isReady: false
}

export function TournamentActions({ tournamentId }: TournamentActionsProps) {
  const [isReady, setIsReady] = useState(mockUser.isReady)

  const handleReady = () => {
    setIsReady(!isReady)
    showToast(
      isReady ? 'Đã hủy sẵn sàng' : 'Đã sẵn sàng!',
      'success'
    )
  }

  const handleLeave = () => {
    // TODO: Handle leave tournament
    showToast('Đang rời giải đấu...', 'info')
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Hành động</h2>

      {mockUser.isHost ? (
        <div className="space-y-4">
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
            <p className="text-sm text-yellow-800">
              Bạn là host của giải đấu này. Vui lòng chờ đủ người chơi để bắt đầu.
            </p>
          </div>
          <Button
            className="w-full h-11 bg-[#E69A00] hover:bg-[#E69A00]/90"
            disabled={true}
          >
            Bắt đầu giải đấu
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
            <p className="text-sm text-gray-600">
              Đang chờ host bắt đầu giải đấu...
            </p>
          </div>
          <Button
            className={cn(
              "w-full h-11",
              isReady
                ? "bg-red-700 hover:bg-red-700"
                : "bg-[#E69A00] hover:bg-[#E69A00]/90"
            )}
            onClick={handleReady}
          >
            {isReady ? 'Hủy sẵn sàng' : 'Sẵn sàng'}
          </Button>
        </div>
      )}

      <Button
        variant="outline"
        className="w-full h-11 text-red-600 hover:text-red-700 hover:bg-red-50"
        onClick={handleLeave}
      >
        Rời giải đấu
      </Button>
    </div>
  )
} 
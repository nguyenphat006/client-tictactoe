'use client'
import { Trophy, Users, Clock, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { showToast } from '@/components/ui/toastify'
import { getTournamentById } from '@/components/mockData'

interface TournamentInfoProps {
  tournamentId: string
}

export function TournamentInfo({ tournamentId }: TournamentInfoProps) {
  const tournament = getTournamentById(Number(tournamentId))

  if (!tournament) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <p className="text-red-500">Không tìm thấy giải đấu</p>
      </div>
    )
  }

  const copyCode = () => {
    navigator.clipboard.writeText(tournament.code)
    showToast('Đã sao chép mã giải đấu!', 'success')
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Trophy className="w-8 h-8 text-[#E69A00]" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{tournament.name}</h1>
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <span className="text-sm text-gray-500">Mã giải đấu:</span>
            <code className="px-2 py-1 bg-gray-100 rounded text-sm font-mono">
              {tournament.code}
            </code>
            <Button
              variant="ghost"
              size="sm"
              onClick={copyCode}
              className="h-8 w-8 p-0 hover:bg-gray-100"
            >
              <Copy className="w-4 h-4 text-gray-500" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          <span>
            {tournament.currentPlayers}/{tournament.maxPlayers} người chơi
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>Bắt đầu lúc {tournament.startTime}</span>
        </div>
      </div>
    </div>

    <div className="flex items-center gap-2 self-start sm:self-center">
      <span
        className={cn(
          "px-3 py-1 rounded-full text-sm font-medium",
          tournament.status === 'waiting'
            ? "bg-yellow-100 text-yellow-800"
            : "bg-green-100 text-green-800"
        )}
      >
        {tournament.status === 'waiting' ? 'Đang chờ' : 'Sắp bắt đầu'}
      </span>
    </div>
  </div>
</div>

  )
} 
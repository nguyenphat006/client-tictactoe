'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

interface PlayerListProps {
  tournamentId: string
}

// Mock data - sẽ được thay thế bằng API call
const mockPlayers = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    avatar: '/avatars/1.png',
    status: 'ready' as const,
    isHost: true
  },
  {
    id: 2,
    name: 'Trần Thị B',
    avatar: '/avatars/2.png',
    status: 'online' as const,
    isHost: false
  },
  {
    id: 3,
    name: 'Lê Văn C',
    avatar: '/avatars/3.png',
    status: 'online' as const,
    isHost: false
  },
  {
    id: 4,
    name: 'Phạm Thị D',
    avatar: '/avatars/4.png',
    status: 'ready' as const,
    isHost: false
  }
]

export function PlayerList({ tournamentId }: PlayerListProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Danh sách người chơi</h2>
      
      <div className="space-y-3">
        <AnimatePresence>
          {mockPlayers.map((player) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={cn(
                "flex items-center justify-between p-3 rounded-lg",
                "border border-gray-100",
                "hover:bg-gray-50 transition-colors"
              )}
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={player.avatar} alt={player.name} />
                  <AvatarFallback>
                    {player.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{player.name}</span>
                    {player.isHost && (
                      <span className="px-2 py-0.5 text-xs rounded-full bg-[#E69A00] text-white">
                        Host
                      </span>
                    )}
                  </div>
                  <span className={cn(
                    "text-sm",
                    player.status === 'ready' ? "text-green-600" : "text-gray-500"
                  )}>
                    {player.status === 'ready' ? 'Sẵn sàng' : 'Đang online'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={cn(
                  "w-2 h-2 rounded-full",
                  player.status === 'ready' ? "bg-green-500" : "bg-gray-400"
                )} />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
} 
'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Clock, ArrowRight, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from '@/lib/utils'
import { mockTournaments, Tournament } from '@/components/mockData'
import { useRouter } from 'next/navigation'

interface TournamentListProps {
  selectedTournamentId: number | null
}

const ITEMS_PER_PAGE = 3

export function TournamentList({ selectedTournamentId }: TournamentListProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'waiting' | 'starting'>('all')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredTournaments = mockTournaments.filter(tournament => {
    const matchesSearch = tournament.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || tournament.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalPages = Math.ceil(filteredTournaments.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedTournaments = filteredTournaments.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleTournamentClick = (tournamentId: number) => {
    router.push(`/tournament/${tournamentId}`)
  }

  return (
    <div className="space-y-4">
      {/* Search and Filter */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input
            placeholder="Tìm kiếm giải đấu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-gray-50 h-10 text-black"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(value) => {
            setStatusFilter(value as any)
            setCurrentPage(1) // Reset to first page when filter changes
          }}
        >
          <SelectTrigger className="w-[180px] bg-gray-50">
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="waiting">Đang chờ</SelectItem>
            <SelectItem value="starting">Sắp bắt đầu</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tournament List */}
      <div className="space-y-3">
        {paginatedTournaments.map((tournament) => (
          <motion.div
            key={tournament.id}
            whileHover={{ scale: 1.02 }}
            className={cn(
              "p-4 rounded-lg border border-gray-200 cursor-pointer",
              "hover:border-[#E69A00] hover:bg-orange-50/50 transition-all",
              selectedTournamentId === tournament.id && "border-[#E69A00] bg-orange-50"
            )}
            onClick={() => handleTournamentClick(tournament.id)}
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-semibold text-gray-900">{tournament.name}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{tournament.currentPlayers}/{tournament.maxPlayers}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{tournament.startTime}</span>
                  </div>
                  <span className={cn(
                    "px-2 py-0.5 rounded-full text-xs",
                    tournament.status === 'waiting' 
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  )}>
                    {tournament.status === 'waiting' ? 'Đang chờ' : 'Sắp bắt đầu'}
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-[#E69A00] hover:text-[#E69A00] hover:bg-orange-100"
              >
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Hiển thị {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredTournaments.length)} 
            &nbsp;của {filteredTournaments.length} giải đấu
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page)}
                className={cn(
                  "h-8 w-8 p-0",
                  currentPage === page && "bg-[#E69A00] hover:bg-[#E69A00]/90"
                )}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

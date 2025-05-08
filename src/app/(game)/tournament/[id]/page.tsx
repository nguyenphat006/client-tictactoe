'use client'
import { use } from 'react'
import { TournamentInfo } from '@/components/tournament/TournamentInfo'
import { PlayerList } from '@/components/tournament/PlayerList'
import { TournamentActions } from '@/components/tournament/TournamentActions'

export default function TournamentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  return (
    <div className="container mx-auto p-6 space-y-6">
      <TournamentInfo tournamentId={id} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PlayerList tournamentId={id} />
        </div>
        <div>
          <TournamentActions tournamentId={id} />
        </div>
      </div>
    </div>
  )
}

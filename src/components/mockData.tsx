export interface Tournament {
  id: number
  name: string
  code: string
  currentPlayers: number
  maxPlayers: number
  status: 'waiting' | 'starting'
  startTime: string
}

export const mockTournaments: Tournament[] = [
  {
    id: 1,
    name: 'Giải Đấu Mùa Hè 2024',
    code: 'SUMMER24',
    currentPlayers: 12,
    maxPlayers: 16,
    status: 'waiting',
    startTime: '10:00'
  },
  {
    id: 2,
    name: 'Cúp Caro Pro',
    code: 'PRO2024',
    currentPlayers: 8,
    maxPlayers: 8,
    status: 'starting',
    startTime: '15:00'
  },
  {
    id: 3,
    name: 'Giải Đấu Nhanh',
    code: 'QUICK24',
    currentPlayers: 4,
    maxPlayers: 8,
    status: 'waiting',
    startTime: '20:00'
  },
  {
    id: 4,
    name: 'Giải Đấu Mùa Đông',
    code: 'WINTER24',
    currentPlayers: 6,
    maxPlayers: 8,
    status: 'waiting',
    startTime: '18:00'
  },
  {
    id: 5,
    name: 'Cúp Vô Địch',
    code: 'CHAMP24',
    currentPlayers: 16,
    maxPlayers: 16,
    status: 'starting',
    startTime: '19:00'
  }
]

export const getTournamentById = (id: number) => {
  return mockTournaments.find(tournament => tournament.id === id)
}

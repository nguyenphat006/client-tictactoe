import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface GameInfoProps {
  currentPlayer: 'X' | 'O'
  player1Name?: string
  player2Name?: string
  player1Score: number
  player2Score: number
  player1Status?: 'online' | 'offline' | 'away'
  player2Status?: 'online' | 'offline' | 'away'
}

export function GameInfo({
  currentPlayer,
  player1Name = 'Player 1',
  player2Name = 'Player 2',
  player1Score,
  player2Score,
  player1Status = 'online',
  player2Status = 'online'
}: GameInfoProps) {
  const getStatusColor = (status: 'online' | 'offline' | 'away') => {
    switch (status) {
      case 'online':
        return 'bg-green-500'
      case 'offline':
        return 'bg-red-500'
      case 'away':
        return 'bg-yellow-500'
    }
  }

  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      <Card className={currentPlayer === 'X' ? 'bg-primary/10' : ''}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-center">X - {player1Name}</CardTitle>
            <Badge variant="outline" className={getStatusColor(player1Status)}>
              {player1Status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-2xl font-bold">{player1Score}</div>
          <div className="text-sm text-muted-foreground">
            {currentPlayer === 'X' && 'Your turn'}
          </div>
        </CardContent>
      </Card>

      <Card className={currentPlayer === 'O' ? 'bg-primary/10' : ''}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-center">O - {player2Name}</CardTitle>
            <Badge variant="outline" className={getStatusColor(player2Status)}>
              {player2Status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-2xl font-bold">{player2Score}</div>
          <div className="text-sm text-muted-foreground">
            {currentPlayer === 'O' && 'Your turn'}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 
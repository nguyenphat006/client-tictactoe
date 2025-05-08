import { Board } from '../Board'
import { GameInfo } from './GameInfo'
import { GameControl } from './GameControl'
import { GameResult } from '../GameResult'
// import { ConnectionStatus } from './ConnectionStatus'

interface GameContainerProps {
  cells: ('X' | 'O' | null)[]
  onCellClick: (index: number) => void
  currentPlayer: 'X' | 'O'
  gameStatus: 'playing' | 'won' | 'draw'
  winningLine?: number[]
  player1Name?: string
  player2Name?: string
  onReset: () => void
  onSurrender: () => void
  onRematch: () => void
  player1Score: number
  player2Score: number
  size: number
  connectionStatus: 'connected' | 'disconnected' | 'reconnecting'
  opponentStatus: 'online' | 'offline' | 'away'
  onReconnect: () => void
}

export function GameContainer({
  cells,
  onCellClick,
  currentPlayer,
  gameStatus,
  winningLine,
  player1Name,
  player2Name,
  onReset,
  onSurrender,
  onRematch,
  player1Score,
  player2Score,
  size,
  connectionStatus,
  opponentStatus,
  onReconnect
}: GameContainerProps) {
  return (
    <div className="w-full">
      {/* <ConnectionStatus 
        status={connectionStatus}
        opponentStatus={opponentStatus}
        onReconnect={onReconnect}
      /> */}
      
      <GameResult 
        status={gameStatus}
        winner={gameStatus === 'won' ? (currentPlayer === 'X' ? player1Name : player2Name) : undefined}
      />
      
      <GameInfo 
        currentPlayer={currentPlayer}
        player1Name={player1Name}
        player2Name={player2Name}
        player1Score={player1Score}
        player2Score={player2Score}
      />

      <div className="max-w-[90vh] mx-auto">
        <Board 
          cells={cells}
          onCellClick={onCellClick}
          winningLine={winningLine}
          size={size}
        />
      </div>

      <GameControl 
        onReset={onReset}
        onSurrender={onSurrender}
        onRematch={onRematch}
        gameStatus={gameStatus}
      />
    </div>
  )
}

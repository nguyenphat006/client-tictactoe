'use client'
import { GameContainer } from '@/components/game/multiplayer/Gamecontainer'
import { GameInfo } from '@/components/game/multiplayer/GameInfo'
import { ConnectionStatus } from '@/components/game/multiplayer/ConnectionStatus'
import { GameControl } from '@/components/game/multiplayer/GameControl'
import { useMultiplayerGame } from '@/hooks/useMultiplayerGame'

interface RoomPageProps {
  params: {
    id: string
    roomId: string
  }
}

export default function RoomPage({ params }: RoomPageProps) {
  const {
    cells,
    currentPlayer,
    gameStatus,
    winningLine,
    player1Score,
    player2Score,
    connectionStatus,
    opponentStatus,
    handleCellClick,
    handleReset,
    handleSurrender,
    handleRematch,
    handleReconnect
  } = useMultiplayerGame()

  return (
    <div className="container mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-6">
        <h1 className="text-2xl font-bold">Phòng #{params.roomId}</h1>
        <ConnectionStatus 
          status={connectionStatus}
          opponentStatus={opponentStatus}
          onReconnect={handleReconnect}
        />
      </div>

      {/* Game Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Game Info & Controls - Left Side */}
        {/* <div className="lg:col-span-3 space-y-6">
          <GameControl 
            onReset={handleReset}
            onSurrender={handleSurrender}
            onRematch={handleRematch}
            gameStatus={gameStatus}
          />
        </div> */}

        {/* Game Board - Center */}
        <div className="lg:col-span-9">
          <GameContainer 
            cells={cells}
            onCellClick={handleCellClick}
            currentPlayer={currentPlayer}
            gameStatus={gameStatus}
            winningLine={winningLine}
            player1Name="Player 1"
            player2Name="Player 2"
            onReset={handleReset}
            onSurrender={handleSurrender}
            onRematch={handleRematch}
            player1Score={player1Score}
            player2Score={player2Score}
            size={20}
            connectionStatus={connectionStatus}
            opponentStatus={opponentStatus}
            onReconnect={handleReconnect}
          />
        </div>

        {/* Chat or Additional Info - Right Side */}
        <div className="lg:col-span-3">
          {/* Chat component sẽ được thêm sau */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 h-[500px]">
            <h2 className="text-lg font-semibold mb-4">Chat</h2>
            <p className="text-gray-500 text-center mt-8">
              Tính năng chat sẽ sớm được cập nhật...
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Wifi, WifiOff } from 'lucide-react'

interface ConnectionStatusProps {
  status: 'connected' | 'disconnected' | 'reconnecting'
  opponentStatus: 'online' | 'offline' | 'away'
  onReconnect: () => void
}

export function ConnectionStatus({
  status,
  opponentStatus,
  onReconnect
}: ConnectionStatusProps) {
  if (status === 'connected' && opponentStatus !== 'offline') return null

  return (
    <Alert
      variant={status === 'connected' ? 'default' : 'destructive'}
      className="flex items-center justify-between"
    >
      <div className="flex items-center gap-2">
        {status === 'connected' ? (
          <>
            <Wifi className="h-4 w-4" />
            <AlertDescription>
              Đối thủ đã {opponentStatus === 'away' ? 'tạm thời rời đi' : 'mất kết nối'}
            </AlertDescription>
          </>
        ) : (
          <>
            <WifiOff className="h-4 w-4" />
            <AlertDescription>
              {status === 'disconnected'
                ? 'Mất kết nối với máy chủ'
                : 'Đang kết nối lại...'}
            </AlertDescription>
          </>
        )}
      </div>

      {status === 'disconnected' && (
        <Button
          variant="outline"
          size="sm"
          onClick={onReconnect}
          className="ml-4"
        >
          Kết nối lại
        </Button>
      )}
    </Alert>
  )
} 
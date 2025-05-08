// import { Button } from '@/components/ui/button'
// import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
// import { Wifi, WifiOff, RefreshCw } from 'lucide-react'

// interface ConnectionStatusProps {
//   status: 'connected' | 'disconnected' | 'reconnecting'
//   opponentStatus: 'online' | 'offline' | 'away'
//   onReconnect: () => void
// }

// export function ConnectionStatus({ 
//   status, 
//   opponentStatus,
//   onReconnect 
// }: ConnectionStatusProps) {
//   if (status === 'connected' && opponentStatus === 'online') {
//     return null
//   }

//   return (
//     <Alert className="mb-4">
//       <div className="flex items-center gap-2">
//         {status === 'connected' ? (
//           <Wifi className="h-4 w-4" />
//         ) : status === 'disconnected' ? (
//           <WifiOff className="h-4 w-4" />
//         ) : (
//           <RefreshCw className="h-4 w-4 animate-spin" />
//         )}
//         <AlertTitle>
//           {status === 'connected' 
//             ? 'Connected' 
//             : status === 'disconnected' 
//               ? 'Disconnected' 
//               : 'Reconnecting...'}
//         </AlertTitle>
//       </div>
//       <AlertDescription className="mt-2">
//         {status === 'connected' && opponentStatus !== 'online' && (
//           <div className="flex items-center justify-between">
//             <span>Opponent is {opponentStatus}</span>
//             <Button variant="outline" size="sm" onClick={onReconnect}>
//               Refresh
//             </Button>
//           </div>
//         )}
//         {status === 'disconnected' && (
//           <div className="flex items-center justify-between">
//             <span>Lost connection to server</span>
//             <Button variant="outline" size="sm" onClick={onReconnect}>
//               Reconnect
//             </Button>
//           </div>
//         )}
//         {status === 'reconnecting' && (
//           <span>Attempting to reconnect...</span>
//         )}
//       </AlertDescription>
//     </Alert>
//   )
// } 
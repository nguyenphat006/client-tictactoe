'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { showToast } from '@/components/ui/toastify'
import { Trophy, KeyRound } from 'lucide-react'
import { cn } from '@/lib/utils'
import { TournamentList } from './TournamentList'

// Schema validation
const TournamentSchema = z.object({
  code: z.string()
    .min(6, 'Mã giải đấu phải có ít nhất 6 ký tự')
    .max(10, 'Mã giải đấu không được quá 10 ký tự')
    .regex(/^[A-Z0-9]+$/, 'Mã giải đấu chỉ được chứa chữ in hoa và số')
})

type TournamentFormData = z.infer<typeof TournamentSchema>

interface TournamentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TournamentModal({ open, onOpenChange }: TournamentModalProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedTournament, setSelectedTournament] = useState<number | null>(null)
  const [showCodeInput, setShowCodeInput] = useState(false)

  const form = useForm<TournamentFormData>({
    resolver: zodResolver(TournamentSchema),
    defaultValues: {
      code: ''
    }
  })

  const onSubmit = async (data: TournamentFormData) => {
    try {
      setIsSubmitting(true)
      // TODO: Call API to validate tournament code
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      
      showToast('Tham gia giải đấu thành công!', 'success')
      router.push(`/tournament/${data.code}`)
    } catch (error: any) {
      showToast(
        error.message || 'Có lỗi xảy ra khi tham gia giải đấu',
        'error'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleJoinTournament = (tournamentId: number) => {
    setSelectedTournament(tournamentId)
    // TODO: Handle join tournament
    showToast('Đang tham gia giải đấu...', 'info')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden bg-white">
        <div className="p-6">
          <DialogHeader className="space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Trophy className="w-8 h-8 text-[#E69A00]" />
              <DialogTitle className="text-2xl font-bold text-gray-900">
                Tham Gia Giải Đấu
              </DialogTitle>
            </div>
            <DialogDescription className="text-center text-gray-600">
              Chọn giải đấu hoặc nhập mã để tham gia
            </DialogDescription>
          </DialogHeader>

          {/* Tournament List */}
          <div className="mt-6">
            <TournamentList 
            //   onJoinTournament={handleJoinTournament}
              selectedTournamentId={selectedTournament}
            />
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">hoặc</span>
            </div>
          </div>

          {/* Join by Code */}
          <div className="space-y-4">
            {!showCodeInput ? (
              <Button
                onClick={() => setShowCodeInput(true)}
                variant="outline"
                className={cn(
                  "w-full h-12 text-base font-medium",
                  "border-2 border-dashed border-gray-200",
                  "hover:border-[#E69A00] hover:bg-orange-50/50",
                  "transition-all duration-200"
                )}
              >
                <div className="flex items-center gap-2">
                  <KeyRound className="w-5 h-5 text-[#E69A00]" />
                  <span>Nhập mã giải đấu</span>
                </div>
              </Button>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="code"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Nhập mã giải đấu
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                {...field}
                                placeholder="Nhập mã giải đấu"
                                className={cn(
                                  "h-11 text-base bg-gray-50",
                                  "placeholder:text-gray-400",
                                  "transition-all duration-200"
                                )}
                                maxLength={10}
                                autoComplete="off"
                              />
                              <KeyRound className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            </div>
                          </FormControl>
                          <FormMessage className="text-sm text-red-500" />
                        </FormItem>
                      )}
                    />

                    <div className="flex gap-3 pt-2">
                      <Button
                        type="submit"
                        className={cn(
                          "flex-1 h-11 text-base font-medium",
                          "bg-[#E69A00] hover:bg-[#E69A00]/90",
                          "text-white shadow-sm",
                          "disabled:opacity-50 disabled:cursor-not-allowed",
                          "transition-all duration-200"
                        )}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Đang xử lý...</span>
                          </div>
                        ) : (
                          'Tham Gia'
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowCodeInput(false)}
                        className={cn(
                          "h-11 text-base font-medium",
                          "border-gray-200 hover:border-gray-300",
                          "hover:bg-gray-50",
                          "transition-all duration-200"
                        )}
                      >
                        Hủy
                      </Button>
                    </div>
                  </form>
                </Form>
              </motion.div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { SigninSchema } from '../schema/index'
import { authService } from '@/service/authService'
import { showToast } from '@/components/ui/toastify'
import { LoginResponse, User } from '@/types/auth.interface'
import { useDispatch } from 'react-redux'
import { setCredentials } from '@/store/features/auth/authSlide'
import { setToken } from '@/lib/auth'
import { ErrorResponse, ErrorResponse2 } from '@/types/base.interface'

export function useSignin() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()

  const onSubmit = async (data: z.infer<typeof SigninSchema>) => {
    try {
      setLoading(true)
      const response = await authService.login({
        email: data.email,
        password: data.password
      })

      // Kiểm tra response có đầy đủ thông tin cần thiết
      if (!response?.accessToken || !response?.user) {
        throw new Error('Invalid response from server')
      }

      // Lưu token và thông tin user
      setToken(response.accessToken)
      dispatch(setCredentials({
        user: response.user,
        token: response.accessToken
      }))

      // Chỉ redirect và hiển thị thông báo khi mọi thứ đã thành công
      showToast('Đăng nhập thành công!', 'success')
      const redirectPath = response.user.role === 'admin' 
        ? '/admin/dashboard' 
        : '/dashboard'
      router.push(redirectPath)
    } catch (error) {
      const err = error as ErrorResponse2
      const firstMessage = err?.message?.[0]?.error
      showToast(firstMessage || 'Có lỗi xảy ra khi đăng nhập', 'error')
      console.error('Login error:', error)
    } finally {
      setLoading(false)
    }
  }

  return { onSubmit, loading }
}

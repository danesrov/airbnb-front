import { UserService } from "@/services/user"
import { useUserStore } from "@/stores/useUser"
import type { UserLogin } from "@/types/user"

export const useUser = () => {
  const {userSession, loading, error} = useUserStore((s) => s)
  const {setUserInSession, setLoading, setError, reset} = useUserStore.getState()

  const userService = new UserService()

  const login = async (dto: UserLogin) => {
    try {
      setLoading(true)
      const data = await userService.login(dto)
      setUserInSession(data)
      return data
    } catch (e) {
      setError(e?.message ?? "Credenciales invalidas")
      throw e
    } finally {
      setLoading(false)
    }
  }

  const signOut = () => {
    setLoading(true)
    reset()
    setLoading(false)
  }

  return {
    userSession,
    loading,
    error,
    login,
    signOut
  }
}
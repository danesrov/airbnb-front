import type { User } from "@/types/user"
import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

type UserState = {
  userSession: User | null
  loading: boolean
  error?: string
}

type UserActions = {
  setUserInSession: (user: User) => void
  setLoading: (v: boolean) => void
  setError: (msg?: string) => void
  reset: () => void
}


const initialState: UserState = { userSession: null, loading: false }

export const useUserStore = create<UserState & UserActions>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        setUserInSession: (user) => set({userSession: user}),
        setLoading: (loading) => set({ loading }),
        setError: (error) => set({ error }),
        reset: () => set({ ...initialState }),
      }),
      {name: 'userSessionStore'}
    )
  )
)
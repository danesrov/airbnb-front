import { create } from "zustand"

type ReservationState = {
  items: any[]
  loading: boolean
  error?: string
}

type ReservationActions = {
  setItems: (items: any[]) => void
  setLoading: (v: boolean) => void
  setError: (msg?: string) => void
  reset: () => void
}

const initialState: ReservationState = { items: [], loading: false }

export const useReservationStore = create<ReservationState & ReservationActions>((set) => ({
  ...initialState,
  setItems: (items) => set({items}),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  reset: () => set({ ...initialState }),
}))
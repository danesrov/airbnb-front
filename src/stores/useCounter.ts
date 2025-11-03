import { create } from "zustand";
import { devtools, persist } from "zustand/middleware"

type CounterState = {
  count: number
  inc: (n?: number) => void
  dec: (n?: number) => void
  reset: () => void
}

export const useCounter = create<CounterState>()(
  devtools(
    persist(
      (set) => ({
        count: 0,
        inc: (n = 1) => set((s) => ({ count: s.count + n })),
        dec: (n = 1) => set((s) => ({ count: Math.max(0, s.count - n) })),
        reset: () => set({ count: 0 }),
      }),
      { name: "counter-store" }
    )
  )
)
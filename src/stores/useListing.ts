import type { Listing } from "@/types/listing"
import { create } from "zustand"

type ListingState = {
  items: Listing[]
  selected?: Listing
  loading: boolean
  error?: string
}

type ListingActions = {
  setItems: (items: Listing[]) => void
  upsert: (item: Listing) => void
  removeById: (id: number) => void
  setSelected: (item?: Listing) => void
  setLoading: (v: boolean) => void
  setError: (msg?: string) => void
  reset: () => void
}

const initialState: ListingState = { items: [], loading: false }


export const useListingsStore = create<ListingState & ListingActions>((set) => ({
  ...initialState,
  setItems: (items) => set({ items }),
  upsert: (item) =>
    set((s) => {
      const idx = s.items.findIndex((x) => x.id_anuncio === item.id_anuncio)
      if (idx >= 0) {
        const copy = s.items.slice()
        copy[idx] = item
        return { items: copy }
      }
      return { items: [item, ...s.items] }
    }),
  removeById: (id) => set((s) => ({ items: s.items.filter((x) => x.id_anuncio !== id) })),
  setSelected: (selected) => set({ selected }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  reset: () => set({ ...initialState }),
}))
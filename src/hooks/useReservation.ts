import { ReservationService } from "@/services/reservations"
import { useReservationStore } from "@/stores/useReservation"

export default function useReservation() {
  const {items, loading, error} = useReservationStore((s) => s)
  const {setItems, setLoading, setError} = useReservationStore.getState()
  const reservationService = new ReservationService()

  const loadByUser = async (id: number) => {
    try {
      setLoading(true)
      const data = await reservationService.getReservationsByUserId(id)
      setItems(data)
      return data
    } catch (e) {
      setError(e?.message ?? "Error cargando anuncios")
      throw e
    }finally {
      setLoading(false)
    }
  }

  return {
    items,
    loading,
    error, 
    loadByUser
  }
}
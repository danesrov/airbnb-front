import { ListingService } from "@/services/listings";
import { useListingsStore } from "@/stores/useListing";
import type { CreateListingDto } from "@/types/listing";

export function useListings() {
  const {items, selected, loading, error} = useListingsStore((s) => s)
  const {setItems, setSelected, setLoading, setError} = useListingsStore.getState()
  const listingService = new ListingService()


  const loadList = async () => {
    try {
      setLoading(true)
      const data = await listingService.list()
      setItems(data)
      return data
    } catch (e) {
      setError(e?.message ?? "Error cargando anuncios")
      throw e
    }finally {
      setLoading(false)
    }
  }

  const createListing = async (dto: CreateListingDto) => {
    try {
      setLoading(true)
      const data = await listingService.createListing(dto)
      return data
    } catch (e) {
      setError(e?.message ?? "Error cargando anuncios")
      throw e
    }finally {
      setLoading(false)
    }
  }

  const loadMoreReserved = async () => {
    try {
      setLoading(true)
      const data = await listingService.getMoreReserved()
      return data
    } catch (e) {
      setError(e?.message ?? "Error cargando anuncio")
      throw e
    } finally {
      setLoading(false)
    }
  }

  return {
    items, selected, loading, error, loadList, setSelected, loadMoreReserved, createListing
  }
}
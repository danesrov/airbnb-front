import AnnouncementCard from "@/components/anuncios/card";
import PrincipalCard from "@/components/anuncios/principal-card";
import Heading from "@/components/headings/heading";
import { Skeleton } from "@/components/ui/skeleton";
import { useListings } from "@/hooks/useListings";
import type { ListingWithUser } from "@/types/listing";
import { useEffect, useState } from "react";
import { FaHouseFlag } from "react-icons/fa6";
import { CreateListingDialogBasic } from "../listings/CreateListingDialog";


export function AnnouncementCardSkeleton() {
  return (
    <div className="rounded-md border p-3">
      {/* imagen */}
      <div className="relative w-full overflow-hidden rounded aspect-[4/3]">
        <Skeleton className="absolute inset-0 h-full w-full" />
      </div>

      {/* texto */}
      <div className="mt-3 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-full" />
      </div>

      {/* botones */}
      <div className="mt-4 flex gap-2">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-24" />
      </div>
    </div>
  )
}

export default function HomeFeed() {
  const { items, loading, loadList, loadMoreReserved, createListing} = useListings()
  const [listingWithUser, setListingWithUser] = useState<ListingWithUser | null>(null)

  useEffect(() => {
    loadList()
    loadMoreReserved().then((data) => setListingWithUser(data))
  },[])


  return (
    <section aria-label="Feed section" className="wrapper py-4">
      <div className="grid grid-cols-1 md:grid-cols-[22rem_1fr_1fr] gap-8">
        <div className="sticky top-0">
          <Heading heading="Recomendaciones" headingType="h2"/>
          <span className="text-gray-400 text-sm">Descubre tu siguiente experiencia</span>

          <div className="grid grid-cols-2 mt-2 gap-4 max-h-[500px] overflow-auto scrollbar">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <AnnouncementCardSkeleton key={i} />)
              : items.map((item) => <AnnouncementCard isList={false} key={item.id_anuncio} item={item} />)}
            {loading && <span className="sr-only">Cargando anuncios…</span>}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <CreateListingDialogBasic
            constants={{ id_ciudad: 101, id_zona: 1, id_politica_cancelacion: 10, moneda: "COP" }}
            onSubmit={(dto) => {
              createListing(dto)
              loadList()
            }}
            trigger={
              <div className="bg-slate-800 gap-2 flex items-center rounded-2xl p-4 max-h-32 cursor-pointer border-2 border-transparent hover:border-emerald-800 transition-all">
                <div className="size-12 flex items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                  <FaHouseFlag />
                </div>
                <span className="text-white font-extrabold">Crear un anuncio</span>
              </div>
            }
          />
          <div className="bg-slate-900 gap-2 flex items-center rounded-2xl p-4 max-h-32 cursor-pointer border-2 border-transparent hover:border-2 hover:border-cyan-800 transition-all">
            <div className="size-12 flex items-center justify-center rounded-2xl bg-cyan-100 text-cyan-600">
              <FaHouseFlag />
            </div>
            <span className="text-white font-extrabold">Ver mis reservas</span>
          </div>
        </div>
        {
          listingWithUser && (
            <div className="sticky top-0">
              <Heading heading="Lo mas reservado" headingType="h2"/>
              <span className="text-gray-400 text-sm mb-2">Una experiencia unica</span>
              <PrincipalCard listing={listingWithUser} key={listingWithUser.id_anuncio}/>
            </div>
          )
        }

      </div>
    </section>
  )
}
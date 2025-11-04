import AnnouncementCard from "@/components/anuncios/card";
import PrincipalCard from "@/components/anuncios/principal-card";
import Heading from "@/components/headings/heading";
import { Skeleton } from "@/components/ui/skeleton";
import { useListings } from "@/hooks/useListings";
import type { ListingWithUser } from "@/types/listing";
import { useEffect, useState } from "react";


function AnnouncementCardSkeleton() {
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
  const { items, loading, loadList, loadMoreReserved} = useListings()
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
              : items.map((item) => <AnnouncementCard key={item.id_anuncio} item={item} />)}
            {loading && <span className="sr-only">Cargando anuncios…</span>}
          </div>
        </div>
        <div></div>
        {
          listingWithUser && (
            <div className="sticky top-0">
              <PrincipalCard listing={listingWithUser} key={listingWithUser.id_anuncio}/>
            </div>
          )
        }

      </div>
    </section>
  )
}
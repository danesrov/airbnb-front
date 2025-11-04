import useReservation from "@/hooks/useReservation"
import { useUser } from "@/hooks/useUser"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import { AnnouncementCardSkeleton } from "../home/feed"
import AnnouncementCard from "@/components/anuncios/card"
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { CiFolderOff } from "react-icons/ci";

function EmptyElement() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <CiFolderOff />
        </EmptyMedia>
        <EmptyTitle className="text-white">Aun no tienes reservas :(</EmptyTitle>
      </EmptyHeader>
    </Empty>
  )
}

export default function ReservasList () {
  const { items, loading, loadByUser} = useReservation()
  const {userSession} = useUser()
  const navigate = useNavigate()

  if(!userSession) navigate('/')

  useEffect(() => {
    if (userSession) {
      loadByUser(userSession.id_usuario)
    }
  }, [userSession])
  
  return (
    <div className={items.length === 0 ? "w-full": "grid grid-cols-4 wrapper"}>
      {items.length === 0 && <EmptyElement/>}
      {loading
        ? Array.from({ length: 6 }).map((_, i) => <AnnouncementCardSkeleton key={i} />)
        : items.map((item) => <AnnouncementCard isList={true} key={item.id_anuncio} item={item} />)}
      {loading && <span className="sr-only">Cargando anuncios…</span>}
    </div>
  )
}
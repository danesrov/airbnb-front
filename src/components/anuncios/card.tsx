import type { Listing } from "@/types/listing";
import { Card, CardContent } from "../ui/card";
import HouseImg from "@/assets/sweden.jpg"
import { Button } from "../ui/button";
import { CreateReservationDialogBasic } from "../pages/reservas/CreateReservationDialog";
import useReservation from "@/hooks/useReservation";
import { useUser } from "@/hooks/useUser";

export default function AnnouncementCard ({item, isList}:{item: Listing; isList:boolean}) {
  const {createNew} = useReservation()
  const {userSession} = useUser()
  return (
    <Card className="w-full p-0 bg-secondary border-0 overflow-hidden">
      <CardContent className="p-0 overflow-hidden">
        <div>
          <img src={HouseImg} alt="House" />
        </div>
        <div className="p-4">
          <span className="text-white font-semibold">{item.titulo}</span>
          <p className="text-white text-xs font-light">{item.descripcion}</p>
          {(!isList && userSession) && (
            <CreateReservationDialogBasic
              id_anuncio={item.id_anuncio}
              trigger={<Button className="w-full mt-2 bg-primary-1">Reservar</Button>} // o un <div> con asChild
              onSubmit={(reservation) => {
                createNew(reservation)
              }}
            />
          )}
          
          
        </div>
      </CardContent>
    </Card>
  )
}
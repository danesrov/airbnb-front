import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import HouseImg from "@/assets/sweden.jpg"
import type { ListingWithUser } from "@/types/listing";
import { CiLocationOn } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";
import Separator from "../utilities/separator";

export default function PrincipalCard ({listing}: {listing: ListingWithUser}) {
  return (
    <Card className="w-full p-0 bg-secondary border-0 overflow-hidden mt-2">
      <CardContent className="p-0 overflow-hidden">
        <div className="relative h-32">
          <img src={HouseImg} alt="House" className="absolute size-full object-cover" />
        </div>
        <div className="p-4 flex flex-col gap-4">
          <div>
            <span className="text-white font-semibold text-xl">{listing.titulo}</span>
            <p className="text-white text-xs font-light">From $1399 / 4 dats</p>
          </div>
          <div className="flex items-center-safe gap-2">
            <CiLocationOn className="text-gray-300"/>
            <span className="text-gray-300">{listing.direccion}</span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-4">
              <Badge variant="default" className="p-2"><CiCalendar /> minimo {listing.min_noches} noches / max {listing.max_noches} noches</Badge>
              <Badge variant="default" className="p-2"><CiUser /> {listing.capacidad} personas</Badge>
            </div>
            <p className="text-white text-xs">{listing.descripcion}</p>
          </div>
          <div className="flex items-end flex-col">
            <span className="text-white font-bold text-3xl">$ {listing.precio_noche_base} {listing.moneda}</span>
            <small className="text-gray-500">Por noche</small>
          </div>
          <Separator/>
          <div className="flex justify-between gap-2">
            <Button variant={"outline"} className="bg-gray-800 text-white">Mas información</Button>
            <Button className="bg-primary-1">Checar disponibilidad</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
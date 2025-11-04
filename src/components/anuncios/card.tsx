import type { Listing } from "@/types/listing";
import { Card, CardContent } from "../ui/card";
import HouseImg from "@/assets/sweden.jpg"

export default function AnnouncementCard ({item}:{item: Listing}) {
  return (
    <Card className="w-full p-0 bg-secondary border-0 overflow-hidden">
      <CardContent className="p-0 overflow-hidden">
        <div>
          <img src={HouseImg} alt="House" />
        </div>
        <div className="p-4">
          <span className="text-white font-semibold">{item.titulo}</span>
          <p className="text-white text-xs font-light">{item.descripcion}</p>
        </div>
      </CardContent>
    </Card>
  )
}
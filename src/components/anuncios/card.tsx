import { Card, CardContent } from "../ui/card";
import HouseImg from "@/assets/sweden.jpg"

export default function AnnouncementCard () {
  return (
    <Card className="w-full max-w-28">
      <CardContent>
        <div>
          <img src={HouseImg} alt="House" />
        </div>
        <div>
          <span>Spain</span>
          <p>From $1399 / 4 dats</p>
        </div>
      </CardContent>
    </Card>
  )
}
import Separator from "@/components/utilities/separator";
import HeadingReserva from "./heading";
import ReservasList from "./list";

export default function ReservasPage () {
  return (
    <section aria-label="Reservation Section">
      <HeadingReserva/>
      <Separator/>
      <ReservasList/>
    </section>
  )
}
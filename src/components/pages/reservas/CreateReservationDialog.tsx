// src/components/reservations/CreateReservationDialog.basic.tsx
import * as React from "react"
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { ReservationDto } from "@/types/reservation"
import { useUser } from "@/hooks/useUser"
import { toast } from "sonner"

type Props = {
  trigger?: React.ReactNode
  defaults?: Partial<Omit<ReservationDto, "id_reserva" | "fecha_creacion" | "fecha_actualizacion">>
  onSubmit: (payload: ReservationDto) => void | Promise<void>
  id_anuncio: number
}

export function CreateReservationDialogBasic({
  trigger = <Button>Nueva reserva</Button>,
  defaults,
  onSubmit,
  id_anuncio
}: Props) {
  const [open, setOpen] = React.useState(false)
  const [submitting, setSubmitting] = React.useState(false)
  const formRef = React.useRef<HTMLFormElement>(null)

  const {userSession} = useUser()

  const toNum = (v: FormDataEntryValue | null, fb = 0) =>
    typeof v === "string" && v.trim() !== "" ? Number(v) : fb

  const toDate = (v: FormDataEntryValue | null) => {
    const s = typeof v === "string" ? v.trim() : ""
    // si viene YYYY-MM-DD, creamos Date en local (o usa new Date(`${s}T00:00:00Z`) si prefieres UTC)
    return s ? new Date(s) : new Date()
  }

  const daysDiff = (a: Date, b: Date) => {
    const ms = b.getTime() - a.getTime()
    return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)

    const fecha_entrada = toDate(fd.get("fecha_entrada"))
    const fecha_salida  = toDate(fd.get("fecha_salida"))
    const nochesCalc    = daysDiff(fecha_entrada, fecha_salida)

    const payload: ReservationDto = {
      id_reserva: 0, // <- SIEMPRE 0

      id_huesped: userSession?.id_usuario || 0,
      id_anuncio: id_anuncio,
      estado: 2,

      fecha_reserva: toDate(fd.get("fecha_reserva")),
      fecha_entrada,
      fecha_salida,
      noches: Math.max(toNum(fd.get("noches"), nochesCalc || 1), 1),
      total:  0,
      zona_horaria_reserva: "America/Bogota",
      fecha_creacion: undefined,
      fecha_actualizacion: undefined,
    }

    // Validación mínima
    if (!(payload.fecha_entrada instanceof Date) || !(payload.fecha_salida instanceof Date)) {
      toast.error("Fechas inválidas.")
      return
    }

    try {
      setSubmitting(true)
      await onSubmit(payload)
      setOpen(false)
      formRef.current?.reset()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Nueva reserva</DialogTitle>
          <DialogDescription>Completa los datos básicos de la reserva.</DialogDescription>
        </DialogHeader>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          {/* Fechas */}
          <div className="grid grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="fecha_reserva">Fecha reserva</Label>
              <Input id="fecha_reserva" name="fecha_reserva" type="date"
                     defaultValue={defaults?.fecha_reserva ? toISODateInput(defaults.fecha_reserva) : ""} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="fecha_entrada">Entrada</Label>
              <Input id="fecha_entrada" name="fecha_entrada" type="date" required
                     defaultValue={defaults?.fecha_entrada ? toISODateInput(defaults.fecha_entrada) : ""} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="fecha_salida">Salida</Label>
              <Input id="fecha_salida" name="fecha_salida" type="date" required
                     defaultValue={defaults?.fecha_salida ? toISODateInput(defaults.fecha_salida) : ""} />
            </div>
          </div>

          {/* Noches y zona horaria */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="noches">Noches</Label>
              <Input id="noches" name="noches" type="number" min={1} defaultValue={defaults?.noches ?? ""} />
              <p className="text-xs text-slate-500">Si lo dejas vacío, se calcula por fechas.</p>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={submitting}>
              Cancelar
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Guardando…" : "Crear reserva"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function toISODateInput(d: Date): string {
  const date = new Date(d)
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

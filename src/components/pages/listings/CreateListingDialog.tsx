// src/components/listings/CreateListingDialog.basic.tsx
import * as React from "react"
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { CreateListingDto } from "@/types/listing"
import { useUser } from "@/hooks/useUser"
import { toast } from "sonner"

type Props = {
  trigger?: React.ReactNode
  constants: {
    id_ciudad: number
    id_zona?: number | null
    id_politica_cancelacion: number
    moneda: string
  }
  defaults?: Partial<Omit<CreateListingDto,
    "id_ciudad" | "id_zona" | "id_politica_cancelacion" | "moneda">>
  onSubmit: (payload: CreateListingDto) => void | Promise<void>
}

export function CreateListingDialogBasic({
  trigger = <Button>Nuevo anuncio</Button>,
  constants,
  defaults,
  onSubmit,
}: Props) {
  const [open, setOpen] = React.useState(false)
  const [submitting, setSubmitting] = React.useState(false)
  const formRef = React.useRef<HTMLFormElement>(null)
  const {userSession} = useUser()

  const toNum = (v: FormDataEntryValue | null, fallback = 0) =>
    typeof v === "string" && v.trim() !== "" ? Number(v) : fallback

  const toOpt = (v: FormDataEntryValue | null) =>
    typeof v === "string" && v.trim() !== "" ? v : null

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)

    const payload: CreateListingDto = {
      // constantes
      id_ciudad: constants.id_ciudad,
      id_zona: constants.id_zona ?? null,
      id_politica_cancelacion: constants.id_politica_cancelacion,
      moneda: constants.moneda,

      // campos editables
      id_anfitrion: userSession?.id_usuario || 0,
      titulo: String(fd.get("titulo") ?? "").trim(),
      descripcion: toOpt(fd.get("descripcion")),
      direccion: toOpt(fd.get("direccion")),
      capacidad: toNum(fd.get("capacidad"), 1),
      precio_noche_base: toNum(fd.get("precio_noche_base"), 0),
      min_noches: toNum(fd.get("min_noches"), 1),
      max_noches: toNum(fd.get("max_noches"), 1),
      hora_checkin: toOpt(fd.get("hora_checkin")),
      hora_checkout: toOpt(fd.get("hora_checkout")),
    }

    if (!payload.id_anfitrion || !payload.titulo || payload.capacidad < 1 || payload.min_noches < 1 || payload.max_noches < 1) {
      toast.error("Revisa los campos obligatorios.")
      return
    }

    try {
      setSubmitting(true)
      await onSubmit(payload) 
      setOpen(false)
      formRef.current?.reset()
      toast.success("Anuncio creado")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Crear anuncio</DialogTitle>
          <DialogDescription>
            Solo completaremos los campos editables; ciudad, zona, política y moneda ya están fijos.
          </DialogDescription>
        </DialogHeader>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">

          {/* titulo */}
          <div className="grid gap-2">
            <Label htmlFor="titulo">Título</Label>
            <Input
              id="titulo"
              name="titulo"
              required
              maxLength={200}
              defaultValue={defaults?.titulo ?? ""}
            />
          </div>

          {/* descripcion */}
          <div className="grid gap-2">
            <Label htmlFor="descripcion">Descripción (opcional)</Label>
            <Textarea id="descripcion" name="descripcion" rows={4} defaultValue={defaults?.descripcion ?? ""} />
          </div>

          {/* direccion */}
          <div className="grid gap-2">
            <Label htmlFor="direccion">Dirección (opcional)</Label>
            <Input id="direccion" name="direccion" defaultValue={defaults?.direccion ?? ""} />
          </div>

          {/* capacidad / precio */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="capacidad">Capacidad</Label>
              <Input
                id="capacidad"
                name="capacidad"
                type="number"
                min={1}
                required
                defaultValue={defaults?.capacidad ?? 1}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="precio_noche_base">Precio base (noche)</Label>
              <Input
                id="precio_noche_base"
                name="precio_noche_base"
                type="number"
                min={0}
                step="0.01"
                required
                defaultValue={defaults?.precio_noche_base ?? 0}
              />
            </div>
          </div>

          {/* min/max noches */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="min_noches">Mín. noches</Label>
              <Input
                id="min_noches"
                name="min_noches"
                type="number"
                min={1}
                required
                defaultValue={defaults?.min_noches ?? 1}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="max_noches">Máx. noches</Label>
              <Input
                id="max_noches"
                name="max_noches"
                type="number"
                min={1}
                required
                defaultValue={defaults?.max_noches ?? 1}
              />
            </div>
          </div>

          {/* horarios */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="hora_checkin">Hora check-in (opcional)</Label>
              <Input id="hora_checkin" name="hora_checkin" type="time" defaultValue={defaults?.hora_checkin ?? ""} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="hora_checkout">Hora check-out (opcional)</Label>
              <Input id="hora_checkout" name="hora_checkout" type="time" defaultValue={defaults?.hora_checkout ?? ""} />
            </div>
          </div>

          {/* Constantes (solo lectura) */}
          <div className="grid grid-cols-2 gap-4 rounded-md border p-3 bg-slate-50">
            <div><Label>Ciudad</Label><p className="text-sm text-slate-700">#{constants.id_ciudad}</p></div>
            <div><Label>Zona</Label><p className="text-sm text-slate-700">{constants.id_zona ?? "—"}</p></div>
            <div><Label>Política</Label><p className="text-sm text-slate-700">#{constants.id_politica_cancelacion}</p></div>
            <div><Label>Moneda</Label><p className="text-sm text-slate-700">{constants.moneda}</p></div>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={submitting}>
              Cancelar
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Guardando…" : "Crear anuncio"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

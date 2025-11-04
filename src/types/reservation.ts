export interface ReservationDto {
  id_reserva: 0;
  id_huesped: number;
  id_anuncio: number;
  estado: number;
  fecha_reserva: Date;
  fecha_entrada: Date;
  fecha_salida: Date;
  noches: number;
  total: number;
  zona_horaria_reserva?: string | null;
  fecha_creacion?: Date;
  fecha_actualizacion?: Date;
}
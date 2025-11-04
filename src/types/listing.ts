export interface Listing {
  id_anuncio: number;
  titulo: string;
  precio_noche_base: number;
  moneda: string;
  capacidad: number;
  ciudad: string;
  zona: string;
  descripcion: string
}

export interface ListingWithUser extends Listing{
  id_anfitrion: number;
  direccion: string;
  min_noches: number;
  max_noches: number;
  anfitrion: string;
  correo_anfitrion: string;
  tel_anfitrion: string;
  reservas_12m: string
}

export interface CreateListingDto {
  /** @min 1 */
  id_anfitrion: number;

  /** @min 1 */
  id_ciudad: number;

  /** opcional, puede ser null */
  id_zona?: number | null;

  /** @min 1 */
  id_politica_cancelacion: number;

  /** @maxLength 200 */
  titulo: string;

  /** opcional */
  descripcion?: string | null;

  /** opcional */
  direccion?: string | null;

  /** @min 1 */
  capacidad: number;

  /** @min 0 */
  precio_noche_base: number;

  /** @min 1 */
  min_noches: number;

  /** @min 1 */
  max_noches: number;

  /** opcional (HH:mm, por ejemplo) */
  hora_checkin?: string | null;

  /** opcional (HH:mm, por ejemplo) */
  hora_checkout?: string | null;

  /** e.g. "COP", "USD" */
  moneda: string;
}
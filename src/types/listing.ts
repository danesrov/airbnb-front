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
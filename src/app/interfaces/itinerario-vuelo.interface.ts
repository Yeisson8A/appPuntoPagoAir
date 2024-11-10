export interface ItinerarioVuelo {
  idVuelo: number;
  aeropuertoOrigen: string;
  aeropuertoDestino: string;
  fechaSalida: Date;
  fechaLlegada: Date;
  horas: number;
  minutos: number;
  tieneEscala: number;
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ItinerarioVueloRequest } from '../interfaces/itinerario-vuelo-request.interface';
import { ItinerarioVueloResponse } from '../interfaces/itinerario-vuelo-response.interface';
import { ItinerarioEscalaVueloResponse } from '../interfaces/itinerario-escala-vuelo-response.interface';

@Injectable({
  providedIn: 'root'
})
export class ItinerarioVueloService {
  private baseUrl = 'http://localhost:41307/';

  constructor(private httpClient: HttpClient) { }

  obtenerItinerariosVuelos(parametros: ItinerarioVueloRequest): Observable<ItinerarioVueloResponse> {
    const response = this.httpClient.post<ItinerarioVueloResponse>(this.baseUrl + 'api/ItinerarioVuelo', parametros);
    return response;
  }

  obtenerTodosItinerariosVuelos(): Observable<ItinerarioVueloResponse> {
    const response = this.httpClient.get<ItinerarioVueloResponse>(this.baseUrl + 'api/ItinerarioVuelo');
    return response;
  }

  obtenerItinerarioEscalasPorIdVuelo(idVuelo: number): Observable<ItinerarioEscalaVueloResponse> {
    const response = this.httpClient.get<ItinerarioEscalaVueloResponse>(this.baseUrl + 'api/ItinerarioEscalaVuelo/' + idVuelo);
    return response;
  }
}

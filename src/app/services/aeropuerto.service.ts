import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AeropuertoResponse } from '../interfaces/aeropuerto-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AeropuertoService {
  private baseUrl = 'http://localhost:41307/';

  constructor(private httpClient: HttpClient) { }

  getAeropuertos(): Observable<AeropuertoResponse> {
    const response = this.httpClient.get<AeropuertoResponse>(this.baseUrl + 'api/Aeropuerto');
    return response;
  }
}

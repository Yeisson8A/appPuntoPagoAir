import { ItinerarioEscalaVuelo } from './../../../interfaces/itinerario-escala-vuelo.interface';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-itinerario-vuelo-escala',
  templateUrl: './itinerario-vuelo-escala.component.html',
  styleUrls: ['./itinerario-vuelo-escala.component.scss']
})
export class ItinerarioVueloEscalaComponent implements OnInit {
  desplegarColumnas = [
    'aeropuertoOrigen',
    'aeropuertoDestino',
    'fechaSalida',
    'fechaLlegada',
    'horas',
    'minutos'
  ];
  dataSource = new MatTableDataSource<ItinerarioEscalaVuelo>();
  @ViewChild(MatSort, { static: true }) ordenamiento!: MatSort;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ItinerarioEscalaVuelo[]) {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<ItinerarioEscalaVuelo>(this.data);
    this.dataSource.sort = this.ordenamiento;
  }
}

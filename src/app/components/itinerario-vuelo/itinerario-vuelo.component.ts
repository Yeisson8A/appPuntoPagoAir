import { ItinerarioVuelo } from './../../interfaces/itinerario-vuelo.interface';
import { MatTableDataSource } from '@angular/material/table';
import { Aeropuerto } from './../../interfaces/aeropuerto.interface';
import { AeropuertoService } from './../../services/aeropuerto.service';
import { ItinerarioVueloService } from './../../services/itinerario-vuelo.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ItinerarioVueloEscalaComponent } from './itinerario-vuelo-escala/itinerario-vuelo-escala.component';

@Component({
  selector: 'app-itinerario-vuelo',
  templateUrl: './itinerario-vuelo.component.html',
  styleUrls: ['./itinerario-vuelo.component.scss'],
})
export class ItinerarioVueloComponent implements OnInit {
  aeropuertos: Aeropuerto[] = [];
  aeropuertoOrigenSeleccionado: string = '';
  aeropuertoDestinoSeleccionado: string = '';
  fechaViaje: string = '';
  desplegarColumnas = [
    'aeropuertoOrigen',
    'aeropuertoDestino',
    'fechaSalida',
    'fechaLlegada',
    'horas',
    'minutos',
    'tieneEscala'
  ];
  dataSource = new MatTableDataSource<ItinerarioVuelo>();
  @ViewChild(MatSort, { static: true }) ordenamiento!: MatSort;

  constructor(
    private itinerarioVueloService: ItinerarioVueloService,
    private aeropuertoService: AeropuertoService,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getAeropuertos();
    this.obtenerTodosItinerariosVuelos();
  }

  getAeropuertos() {
    this.aeropuertoService.getAeropuertos().subscribe((data) => {
      this.aeropuertos = data.data;
    });
  }

  obtenerTodosItinerariosVuelos() {
    this.itinerarioVueloService
      .obtenerTodosItinerariosVuelos()
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource<ItinerarioVuelo>(data.data);
        this.dataSource.sort = this.ordenamiento;
      });
  }

  limpiar() {
    this.aeropuertoOrigenSeleccionado = '';
    this.aeropuertoDestinoSeleccionado = '';
    this.fechaViaje = '';
    this.obtenerTodosItinerariosVuelos();
  }

  obtenerItinerariosVuelos() {
    if (
      this.aeropuertoOrigenSeleccionado === '' ||
      this.aeropuertoDestinoSeleccionado === '' ||
      this.fechaViaje === ''
    ) {
      this._snackBar.open(
        'Debe seleccionar un aeropuerto origen, un aeropuerto destino y una fecha de viaje',
        'Cerrar',
        {
          duration: 3000,
        }
      );
      return;
    }

    this.itinerarioVueloService
      .obtenerItinerariosVuelos({
        codAeropuertoOrigen: this.aeropuertoOrigenSeleccionado,
        codAeropuertoDestino: this.aeropuertoDestinoSeleccionado,
        fechaViaje: new Date(this.fechaViaje),
      })
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource<ItinerarioVuelo>(data.data);
        this.dataSource.sort = this.ordenamiento;
      });
  }

  abrirDialogEscalasVuelo(idVuelo: number) {
    this.itinerarioVueloService.obtenerItinerarioEscalasPorIdVuelo(idVuelo).subscribe((data) => {
      this._dialog.open(ItinerarioVueloEscalaComponent, {
        width: '850px',
        data: data.data
      });
    });

  }
}

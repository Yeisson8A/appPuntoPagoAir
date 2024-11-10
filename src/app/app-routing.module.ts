import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItinerarioVueloComponent } from './components/itinerario-vuelo/itinerario-vuelo.component';

const routes: Routes = [
  { path: '', component: ItinerarioVueloComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

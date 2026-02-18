import { Routes } from '@angular/router';
import { BuscadorComponent } from './buscador/buscador';
import { InicioComponent } from './inicio/inicio';
import { MarteComponent } from './marte/marte';

export const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'buscador', component: BuscadorComponent },
  { path: 'marte', component: MarteComponent },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' } // Si no hay nada, va a inicio
];

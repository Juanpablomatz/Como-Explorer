import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink], // Cargamos las herramientas de rutas
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Como-Explorer';
}
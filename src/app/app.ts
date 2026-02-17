import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BuscadorComponent } from './buscador/buscador'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BuscadorComponent], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Como-Explorer';
}
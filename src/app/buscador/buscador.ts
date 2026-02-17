import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NasaService } from '../nasa';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'; // Importante para la seguridad

@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './buscador.html',
  styleUrl: './buscador.css'
})
export class BuscadorComponent {
  // Variable que contendrá todo el HTML de las tarjetas
  contenidoGaleria: SafeHtml = '';

  constructor(
    private nasaService: NasaService,
    private sanitizer: DomSanitizer // Inyectamos el desinfectante de HTML
  ) {}

  hacerBusqueda(termino: string) {
    if (!termino) return;

    this.nasaService.buscar(termino).subscribe((respuesta: any) => {
      const items = respuesta.collection.items;
      let htmlTemporal = '';

      // Construimos las tarjetas manualmente usando un ciclo de JS puro
      items.forEach((foto: any) => {
        const titulo = foto.data[0].title;
        const descripcion = foto.data[0].description || 'Sin descripción disponible.';
        const imagen = foto.links[0].href;
        const fecha = new Date(foto.data[0].date_created).toLocaleDateString();

        // Vamos sumando el HTML de cada card a nuestra cadena de texto
        htmlTemporal += `
          <div class="glass-card">
            <div class="img-mini">
              <img src="${imagen}" alt="${titulo}">
            </div>
            <div class="card-content">
              <h3>${titulo}</h3>
              <p class="description">${descripcion}</p>
              <span class="date">${fecha}</span>
            </div>
          </div>
        `;
      });

      // "Sanitizamos" el HTML y lo inyectamos en la variable
      this.contenidoGaleria = this.sanitizer.bypassSecurityTrustHtml(htmlTemporal);
    });
  }
}
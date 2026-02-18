import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NasaService } from '../nasa';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-marte',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './marte.html',
  styleUrl: './marte.css'
})
export class MarteComponent {
  galeriaMarteHtml: SafeHtml = '';
  fechaSeleccionada: string = '2022-01-01'; // Cambié la fecha inicial a una que SI tiene fotos
  roverSeleccionado: string = 'curiosity';

  constructor(private nasaService: NasaService, private sanitizer: DomSanitizer) {}

  buscarFotosMarte() {
    // 1. Limpiamos la pantalla y mostramos mensaje de carga
    this.galeriaMarteHtml = this.sanitizer.bypassSecurityTrustHtml(
      '<p style="color:#00d2ff; text-align:center; grid-column:1/-1;">Conectando con el Rover...</p>'
    );

    // 2. Llamamos al servicio
    this.nasaService.getMarsPhotos(this.roverSeleccionado, this.fechaSeleccionada).subscribe({
      next: (res: any) => {
        console.log("Datos recibidos de Marte:", res);
        let html = '';
        const fotos = res.photos;

        if (!fotos || fotos.length === 0) {
          html = '<p style="color:yellow; text-align:center; grid-column:1/-1;">No hay fotos para esta fecha. Intenta con 2022-01-01</p>';
        } else {
          // Solo mostramos las primeras 20 para no saturar la memoria
          fotos.slice(0, 20).forEach((f: any) => {
            html += `
              <div class="glass-card">
                <div class="img-mini">
                  <img src="${f.img_src}" alt="Marte">
                </div>
                <div class="card-content">
                  <h3>Rover: ${f.rover.name}</h3>
                  <p class="description">Cámara: ${f.camera.full_name}</p>
                  <span class="date">Sol (Día Marciano): ${f.sol}</span>
                </div>
              </div>`;
          });
        }
        // 3. Inyectamos el HTML final
        this.galeriaMarteHtml = this.sanitizer.bypassSecurityTrustHtml(html);
      },
      error: (err) => {
        console.error("Error detectado:", err);
        this.galeriaMarteHtml = this.sanitizer.bypassSecurityTrustHtml(
          '<p style="color:red; text-align:center; grid-column:1/-1;">Error 404: No se pudo contactar con el Rover. Revisa el archivo nasa.ts</p>'
        );
      }
    });
  }
}
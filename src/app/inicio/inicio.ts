import { Component, OnInit } from '@angular/core';
import { NasaService } from '../nasa';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-inicio',
  standalone: true,
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class InicioComponent implements OnInit {
  apodHtml: SafeHtml = '';

  constructor(private nasaService: NasaService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.nasaService.getApod().subscribe((data: any) => {
      const contenido = `
        <div class="apod-card">
          <h1 class="title">${data.title}</h1>
          <img src="${data.url}" class="apod-img">
          <div class="apod-info">
            <p>${data.explanation}</p>
            <small>Fecha: ${data.date}</small>
          </div>
        </div>
      `;
      this.apodHtml = this.sanitizer.bypassSecurityTrustHtml(contenido);
    });
  }
}
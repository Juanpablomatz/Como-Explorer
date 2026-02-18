import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NasaService {
  // 1. USA TU CLAVE REAL AQUÍ (La que ya tenías antes)
  private apiKey = 'bXJIFBuVWw2aLNM211M7btLQvpY3PPnB1AGXFbnS'; 

  // 2. REVISA QUE ESTAS DIRECCIONES ESTÉN COMPLETAS
  private urlApod = 'https://api.nasa.gov/planetary/apod';
  private urlMars = 'https://api.nasa.gov/mars-photos/api/v1/rovers';
  private urlLibrary = 'https://images-api.nasa.gov/search';

  constructor(private http: HttpClient) { }

  getApod(): Observable<any> {
    return this.http.get(`${this.urlApod}?api_key=${this.apiKey}`);
  }

  getMarsPhotos(rover: string, fecha: string): Observable<any> {
    // Asegúrate de que no haya puntos extras aquí
    const urlCompleta = `${this.urlMars}/${rover}/photos?earth_date=${fecha}&api_key=${this.apiKey}`;
    return this.http.get(urlCompleta);
  }

  buscar(palabra: string): Observable<any> {
    return this.http.get(`${this.urlLibrary}?q=${palabra}&media_type=image`);
  }
}
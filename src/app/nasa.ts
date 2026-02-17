import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NasaService {
  private urlApi = 'https://images-api.nasa.gov/search';

  constructor(private http: HttpClient) { }

  buscar(palabra: string): Observable<any> {
    return this.http.get(`${this.urlApi}?q=${palabra}&media_type=image`);
  }
}
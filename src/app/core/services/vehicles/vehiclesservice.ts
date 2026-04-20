import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Brand } from '../../interfaces/brands.interface';
import { Models } from '../../interfaces/models.interface';
@Injectable({
  providedIn: 'root',
})
export class Vehiclesservice {
  constructor(private http: HttpClient) { }
  private apiUrl = environment.apiUrl;
  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(`${this.apiUrl}brands`);
  }
  createBrand(brand: Brand): Observable<Brand> {
    return this.http.post<Brand>(`${this.apiUrl}brands`, brand);
  }
  createModel(model: Models): Observable<Models> {
    return this.http.post<Models>(`${this.apiUrl}models`, model);
  }
  getModels(): Observable<Models[]> {
    return this.http.get<Models[]>(`${this.apiUrl}models`);
  }
}

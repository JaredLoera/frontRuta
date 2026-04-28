import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Brand } from '../../interfaces/brands.interface';
import { Models } from '../../interfaces/models.interface';
import { Vehicle } from '../../interfaces/vehicle.interface';
import { Driver } from '../../interfaces/drivers.interface';
import { Response } from '../../interfaces/response.interface';
import { assings } from '../../interfaces/assing.interface';
import { unassign } from '../../interfaces/unassign.interface';
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
  //http://localhost:3000/api/vehicles?concessionaireId=7c7a1e8e-afae-4062-97a4-9a77edd62cf0
  getVehicles(id: string): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.apiUrl}vehicles?concessionaireId=${id}`);
  }
  createVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(`${this.apiUrl}vehicles`, vehicle);
  }
  createDriver(driver: Driver): Observable<Response> {
    return this.http.post<Response>(`${this.apiUrl}drivers`, driver);
  }
  getDriver(id: string): Observable<Driver[]> {
    return this.http.get<Driver[]>(`${this.apiUrl}drivers?concessionaireId=${id}`);
  }
  assing(assing: assings) {
    return this.http.post(`${this.apiUrl}vehicles/assign`, assing);

  }
  unassign(unassign: unassign): Observable<any> {
    return this.http.put(`${this.apiUrl}vehicles/unassign`, unassign);
  }

}

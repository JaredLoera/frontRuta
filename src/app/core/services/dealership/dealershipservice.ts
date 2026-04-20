import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { DealerShip } from '../../interfaces/dealer.interface';


@Injectable({
  providedIn: 'root',
})
export class Dealershipservice {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
   getDealerShips(): Observable<DealerShip[]> {
    return this.http.get<DealerShip[]>(`${this.apiUrl}concessionaires`);
   }
   createDealerShip(dealer: DealerShip): Observable<DealerShip> {
    return this.http.post<DealerShip>(`${this.apiUrl}concessionaires`, dealer);
  }
}

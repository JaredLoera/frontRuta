import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Response } from '../../interfaces/response.interface';
import { User as UserInterface } from '../../interfaces/user.interface';
import { Profile } from '../../interfaces/profile.interface';

@Injectable({
  providedIn: 'root',
})
export class User {
   private readonly token = environment.storageNames.token;
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }


  // getDealerShips(): Observable<Response<UserInterface<Profile>>> {
  //   return this.http.get<Response<UserInterface<Profile>>>(`${this.apiUrl}dealerships`);
  // }
}

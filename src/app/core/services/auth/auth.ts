import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Response } from '../../interfaces/response.interface';
import { Token } from '../../interfaces/token.interface';
import { User } from '../../interfaces/user.interface';
import { Profile } from '../../interfaces/profile.interface';
@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly token = environment.storageNames.token;
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<Response<Token>> {
    return this.http.post<Response<Token>>(`${this.apiUrl}auth/login`, {
      email,
      password,
    });
  }
  setToken(token: string): void {
    localStorage.setItem(this.token, token);
  }
  getToken(): string | null {
    return localStorage.getItem(this.token);
  }
  logout(): void {
    localStorage.removeItem(this.token);
  }
  setUser(user: User<Profile>): void {
    localStorage.setItem(environment.storageNames.user, JSON.stringify(user));
  }
  getUserFromStorage(): User<Profile> | null {
    const userJson = localStorage.getItem(environment.storageNames.user);
    return userJson ? JSON.parse(userJson) : null;
  }
  setProfile(profile: Profile): void {
    localStorage.setItem(environment.storageNames.profile, JSON.stringify(profile));
  }
  getProfileFromStorage(): Profile | null {
    const profileJson = localStorage.getItem(environment.storageNames.profile);
    return profileJson ? JSON.parse(profileJson) : null;
  }

  getUser(): Observable<Response<User<Profile>>> {
    return this.http.get<Response<User<Profile>>>(`${this.apiUrl}auth/user`);
  }
  getProfile(): Observable<Response<Profile>> {
    return this.http.get<Response<Profile>>(`${this.apiUrl}auth/profile`);
  }
}

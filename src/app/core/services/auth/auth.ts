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

  login(email: string, password: string): Observable<Token> {
    return this.http.post<Token>(`${this.apiUrl}auth/signin`, {
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
  closeSession(): any {
    return this.http.post<any>(`${this.apiUrl}auth/logout`, {})
  }
  logout(): void {
    localStorage.removeItem(this.token);
    localStorage.removeItem(environment.storageNames.user);
    localStorage.removeItem(environment.storageNames.profile);
  }
  setUser(user: User): void {
    localStorage.setItem(environment.storageNames.user, JSON.stringify(user));
  }
  getUserFromStorage(): User | null {
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

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}auth/user`);
  }
  getProfile(): Observable<Profile> {
    return this.http.get<Profile>(`${this.apiUrl}auth/profile`);
  }
}

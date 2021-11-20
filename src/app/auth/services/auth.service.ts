import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';
import { tap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = environment.baseUrlJsonServer;
  private _auth: Auth | undefined;

  constructor(private http: HttpClient) {}

  get auth() {
    return { ...this._auth };
  }

  verificaAutenticacion(): Observable<boolean> {
    const id = localStorage.getItem('id');

    if (!id) return of(false);
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/${id}`).pipe(
      map((resp: Auth) => {
        if (resp) {
          this._auth = resp;
          return true;
        }
        return false;
      })
    );
  }

  login() {
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`).pipe(
      tap((resp) => (this._auth = resp)),
      tap((resp) => localStorage.setItem('id', resp.id))
    );
  }

  logOut() {
    this._auth = undefined;
    localStorage.removeItem('id');
  }
}

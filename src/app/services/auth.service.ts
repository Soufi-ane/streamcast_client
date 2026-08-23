import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, map, tap, finalize } from 'rxjs';

const API_BASE_URL = 'http://localhost:8080';

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `${API_BASE_URL}/users`;
  isLoggedIn = signal(false);
  currentUser = signal<AuthResponse['user'] | null>(null);

  constructor(private http: HttpClient) {}

  signup(payload: SignupPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.baseUrl}/register`,
      payload,
      { withCredentials: true }
    ).pipe(
      tap(res => {
        this.isLoggedIn.set(true);
        this.currentUser.set(res.user);
      })
    );
  }

  login(payload: LoginPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.baseUrl}/login`,
      payload,
      { withCredentials: true }
    ).pipe(
      tap(res => {
        this.isLoggedIn.set(true);
        this.currentUser.set(res.user);
      })
    );
  }

  logout(): Observable<void> {
    return this.http.post<void>(
      `${this.baseUrl}/logout`,
      {},
      { withCredentials: true }
    ).pipe(
      finalize(() => {
        this.isLoggedIn.set(false);
        this.currentUser.set(null);
      })
    );
  }

  checkAuth(): Observable<boolean> {
    return this.http.get<AuthResponse>(
      `${this.baseUrl}/auth`,
      { withCredentials: true }
    ).pipe(
      tap(res => {
        this.isLoggedIn.set(true);
        this.currentUser.set(res.user);
      }),
      map(() => true),
      catchError(() => {
        this.isLoggedIn.set(false);
        this.currentUser.set(null);
        return of(false);
      })
    );
  }
}

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

}

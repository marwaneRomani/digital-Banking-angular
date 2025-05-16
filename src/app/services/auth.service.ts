import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginResponse } from '../models/login-response.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly EMAIL_KEY = 'auth_email';
  private readonly BASE_URL = 'http://localhost:8080/api';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(
    this.hasToken()
  );

  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private userRoleSubject = new BehaviorSubject<string | null>(
    this.getUserRole()
  );
  public userRole$ = this.userRoleSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.BASE_URL}/auth/login`, { email, password })
      .pipe(
        tap((response: LoginResponse) => {
          this.setSession(response);
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.EMAIL_KEY);
    this.isAuthenticatedSubject.next(false);
    this.userRoleSubject.next(null);
    this.router.navigate(['/login']);
  }

  private setSession(authResult: LoginResponse): void {
    localStorage.setItem(this.TOKEN_KEY, authResult.token);
    localStorage.setItem(this.EMAIL_KEY, authResult.email);
    this.isAuthenticatedSubject.next(true);

    const role = this.decodeToken(authResult.token);
    this.userRoleSubject.next(role);

    // Navigate based on role
    if (role === 'AGENT') {
      this.router.navigate(['/agent/dashboard']);
    } else if (role === 'CLIENT') {
      this.router.navigate(['/client/dashboard']);
    }
  }

  private decodeToken(token: string): string | null {
    try {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      const parsedPayload = JSON.parse(decodedPayload);
      return parsedPayload.roles?.[0]?.authority || null;
    } catch (err) {
      console.error('Failed to decode token', err);
      return null;
    }
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private hasToken(): boolean {
    return !!this.getToken();
  }

  isAgent(): boolean {
    const role = this.getUserRole();
    return role === 'AGENT';
  }

  isClient(): boolean {
    const role = this.getUserRole();
    return role === 'CLIENT';
  }

  private getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;
    return this.decodeToken(token);
  }
}

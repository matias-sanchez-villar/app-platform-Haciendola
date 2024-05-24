import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
}) 
export class TokenService {
  private baseUrl = 'http://localhost:3000/token';
  private token: string | null = null;

  constructor(private http: HttpClient) {}

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return this.token || localStorage.getItem('token');
  }

  getIsToken(): boolean {
    if (this.token || localStorage.getItem('token')) 
      return true;
    else return false
  }

  clearToken(): void {
    this.token = null;
    localStorage.removeItem('token');
  }

  async renew(): Promise<boolean | unknown> {
    const url = `${this.baseUrl}/renew`;
    try {
      this.http
        .post(url, null, { observe: 'response' })
        .subscribe((response) => {
          const token = response?.headers?.get('Authorization');
          if (token) this.token = token;
          else {
            this.clearToken();
            throw new Error('Usuario no valido, intente nuevamente');
          }
        });
      return true;
    } catch (error) {
      return error;
    }
  }

  async verify(): Promise<boolean | unknown> {
    const url = `${this.baseUrl}/verify`;
    try {
      const response = this.http.post(url, null, {
        headers: this.headers(),
      });
      if (!response) {
        this.clearToken();
        throw new Error('Usuario no valido, intente nuevamente');
      }
      return response;
    } catch (error) {
      return error;
    }
  }

  headers(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
  }
}

import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Usuario }from '../../shared/interface/Usuario';
import { Auth } from '../../shared/interface/Auth';
import { TokenService } from './token.service';
import { environment } from 'src/environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl =  environment.apiUrl + '/user';

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  async login(body: Auth): Promise<{ token: string, user: any }> {
    const url = `${this.baseUrl}/login`;
    try {
      const response: any = await this.http.post(url, body).toPromise();
      this.tokenService.setToken(response.token)
      return response.user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async register(user: Usuario): Promise<{ token: string, user: any }> {
    const url = `${this.baseUrl}/new`;
    try {
      const response: any = await this.http.post(url, user).toPromise();
      this.tokenService.setToken(response.token)
      return response.user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async resetPassword(body : Auth): Promise<any> {
    const url = `${this.baseUrl}/reset-password`;
    try {
      return await this.http.post(url, body, { observe: 'response' })
      .subscribe((response)=>{
        const token = response?.headers?.get('Authorization');
        if (token)  this.tokenService.setToken(token);
        else throw new Error("Usuario no valido, intente nuevamente")
        return response.body;
      });
    } catch (error) {
      return error;
    }
  }

  logout() {
    this.tokenService.clearToken()
  }
  
}

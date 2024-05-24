import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { Product } from '../../shared/interface/Product';
import { environment } from 'src/environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl =  environment.apiUrl + '/user';

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  async getAllProducts(): Promise<{ product: Product[] }> {
    try {
      const headers = this.tokenService.headers();
      const response: any = await this.http.get(`${this.baseUrl}/all`, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async createProduct(product: Product): Promise<any> {
    try {
      const headers = this.tokenService.headers();
      const response: any = await this.http.post(this.baseUrl, product, { headers }).toPromise();
      return response.ok;
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(product: Product): Promise<any> {
    try {
      const headers = this.tokenService.headers();
      const response: any = await this.http.put(this.baseUrl, product, { headers }).toPromise();
      return response.ok;
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id: string): Promise<any> {
    try {
      const headers = this.tokenService.headers();
      const response: any = await this.http.delete(`${this.baseUrl}/${id}`, { headers }).toPromise();
      return response.message;
    } catch (error) {
      throw error;
    }
  }
  
}

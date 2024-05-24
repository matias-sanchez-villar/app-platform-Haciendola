import { Component } from '@angular/core';
import { TokenService } from '../../core/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private tokenService: TokenService, 
    private router: Router) {}

  goBack() {
    this.tokenService.clearToken();
    this.logIn()
  }

  tokenExists() : boolean {
    return this.tokenService.getIsToken();
  }

  productNew(){
    this.router.navigate(['product/new']);
  }

  productList(){
    this.router.navigate(['product/list']);
  }

  logIn(){
    this.router.navigate(['login']);
  }
}

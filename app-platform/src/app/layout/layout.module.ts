import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TokenService } from '../core/services/token.service'; 

@NgModule({
  declarations: [
    LayoutComponent,
    FooterComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  providers: [TokenService],
  exports: [
  ],
})
export class LayoutModule { }

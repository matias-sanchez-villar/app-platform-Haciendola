import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './pages/product/product.component';
import { ProductAcctionComponent } from './pages/product-acction/product-acction.component';
import { HomeRoutingModule } from './home-routing.module';
import { ProductService } from 'src/app/core/services/product.service';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    ProductComponent,
    ProductAcctionComponent,
    WelcomeComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
  ],
  providers: [
    ProductService
  ],
})
export class HomeModule { }

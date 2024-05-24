import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { RePasswordComponent } from './pages/re-password/re-password.component';
import { RegisterComponent } from './pages/register/register.component';
import { AccessComponent } from './components/access/access.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { TokenService } from '../../core/services/token.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    LoginComponent,
    RePasswordComponent,
    RegisterComponent,
    AccessComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [
    AuthService,
    TokenService
  ],
})
export class AuthModule { }

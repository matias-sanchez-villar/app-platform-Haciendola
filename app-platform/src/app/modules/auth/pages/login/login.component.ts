import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { Auth } from '../../../../shared/interface/Auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss'],
})
export class LoginComponent {
  formGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  actualizarFormGroup(nuevoFormGroup: FormGroup) {
    this.formGroup = nuevoFormGroup;
  }

  async formSubmitEventHandler() {
    try {
      const formData = this.formGroup.value as Auth;
      await this.authService.login(formData);
      this.formGroup.reset();
      this.router.navigate(['/product/list']);
    } catch (e) {
      console.log(e);
    }
  }
}

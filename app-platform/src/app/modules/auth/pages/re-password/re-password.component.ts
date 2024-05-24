import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { Auth } from '../../../../shared/interface/Auth';

@Component({
  selector: 'app-re-password',
  templateUrl: './re-password.component.html',
  styleUrls: ['./re-password.component.scss'],
})
export class RePasswordComponent {
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

  goBack() {
    const previousUrl: string = this.router.url;
    if (previousUrl === '/register' || previousUrl === '/login') {
      this.router.navigate([previousUrl]);
    } else {
      this.router.navigate(['/login']);
    }
  }

  async formSubmitEventHandler() {
    try {
      const formData = this.formGroup.value as Auth;
      await this.authService.resetPassword(formData);
      this.formGroup.reset();
    } catch (e) {
      console.log(e);
    }
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { Usuario } from '../../../../shared/interface/Usuario';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  formGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      dateOfBirth: [''],
      phone: [''],
    });
  }

  actualizarFormGroup(nuevoFormGroup: FormGroup) {
    this.formGroup = nuevoFormGroup;
  }

  goBack() {
    const previousUrl = this.router.url;
    if (previousUrl === '/recover' || previousUrl === '/login') {
      this.router.navigate([previousUrl]);
    } else {
      this.router.navigate(['/login']);
    }
  }

  async formSubmitEventHandler() {
    
    try {
      const formData = this.formGroup.value as Usuario;
      await this.authService.register(formData);
      this.formGroup.reset();
      this.router.navigate(['/product/list']);
    } catch (e) {
      console.log(e);
    }
  }
}

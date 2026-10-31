import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/auth/services/auth.service';
import { Subscription } from 'rxjs';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  msgError = signal('');
  loading = signal(false);
  registerSubscribe: Subscription = new Subscription();
  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      username: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      dateOfBirth: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,19}/),
      ]),
      rePassword: new FormControl('', Validators.required),
    },
    { validators: this.confirmPassword },
  );
  submitForm(): void {
    if (this.registerForm.valid) {
      this.loading.set(true);
      this.registerSubscribe.unsubscribe();
      this.registerSubscribe = this.authService.signUp(this.registerForm.value).subscribe({
        next: (res) => {
          this.loading.set(false);

          if (res.success) {
            console.log(res);
            this.router.navigate(['/login']);
          }
        },
        error: (err) => {
          this.msgError.set(err.error.message);
          this.loading.set(false);
        },
        complete: () => {
          this.loading.set(false);
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
  confirmPassword(group: AbstractControl) {
    const Password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;
    if (rePassword !== Password && rePassword !== '') {
      group.get('rePassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    } else {
      return null;
    }
  }
}

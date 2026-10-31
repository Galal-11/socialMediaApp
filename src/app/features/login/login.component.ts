import { Component, inject, signal } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/auth/services/auth.service';
import { TempAuthServiceService } from '../../core/auth/services/temp-auth-service.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly tempAuthServiceService = inject(TempAuthServiceService);
  private readonly fb = inject(FormBuilder);
  msgError = signal('');
  loading = signal(false);
  loginSubscribe: Subscription = new Subscription();
  // loginForm: FormGroup = new FormGroup({
  //   login: new FormControl('', [Validators.required, Validators.minLength(3)]),

  //   password: new FormControl('', [
  //     Validators.required,
  //     Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,19}/),
  //   ]),
  // });
  loginForm: FormGroup = this.fb.group({
    login: ['', [Validators.required, Validators.minLength(3)]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,19}/),
      ],
    ],
  });
  submitForm(): void {
    if (this.loginForm.valid) {
      this.loading.set(true);
      this.loginSubscribe.unsubscribe();
      this.loginSubscribe = this.authService.signIn(this.loginForm.value).subscribe({
        next: (res) => {
          this.loading.set(false);

          if (res.success) {
            console.log(res);
            localStorage.setItem('token', res.data.token);
            this.tempAuthServiceService.password = this.loginForm.value.password;
            localStorage.setItem('user', JSON.stringify(res.data.user));
            this.router.navigate(['/timeline']);
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
      this.loginForm.markAllAsTouched();
    }
  }
}

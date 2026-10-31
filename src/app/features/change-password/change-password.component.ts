import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from './../../core/auth/services/auth.service';
import { Component, inject, signal } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { TempAuthServiceService } from '../../core/auth/services/temp-auth-service.service';
import { form } from '@angular/forms/signals';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule, LoginComponent],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly tempAuthServiceService = inject(TempAuthServiceService);

  checkPassword: ValidatorFn = (control: AbstractControl) => {
    if (!control.value) {
      return null;
    }

    if (control.value !== this.tempAuthServiceService.password) {
      console.log(control.value === this.tempAuthServiceService.password);
      return { incorrectPassword: true };
    }

    return null;
  };

  form = this.fb.group(
    {
      Password: ['', [Validators.required, this.checkPassword]],
      newPassword: [
        '',
        [
          Validators.required,

          Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,19}/),
        ],
      ],
      confirmPassword: ['', Validators.required],
    },
    { validators: this.confirm },
  );

  change(): void {
    this.authService
      .changePassword({
        password: this.form.value.Password,
        newPassword: this.form.value.newPassword,
      })
      .subscribe({
        next: (res) => {
          console.log(res);

          this.tempAuthServiceService.password = this.form.value.newPassword ?? '';
          this.form.reset();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  confirm(group: AbstractControl) {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    if (newPassword !== confirmPassword && confirmPassword !== '') {
      return { mismatch: true };
    } else {
      return null;
    }
  }
  // errMsg = signal('');

  // updatePassword(): void {
  //   this.tempAuthServiceService.password = this.newPass?.value ?? '';
  //   this.newPass?.setValue('');
  //   this.currentPass?.setValue('');
  //   this.confirmPass?.setValue('');
  // }
  cancel(): void {
    this.router.navigate(['/setting']);
  }
}

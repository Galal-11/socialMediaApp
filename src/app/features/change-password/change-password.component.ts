import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
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
  form = this.fb.group(
    {
      Password: ['', Validators.required],
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

          this.tempAuthServiceService.password = this.newPass?.value ?? '';
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
  errMsg = signal('');
  checkPassword(): boolean {
    const current = this.form.get('Password');
    if (this.tempAuthServiceService.password !== this.currentPass?.value) {
      this.errMsg.set('password is invalid');
      return false;
    }
    this.errMsg.set('');

    return true;
  }
  readonly newPass = this.form.get('newPassword');
  readonly currentPass = this.form.get('currentPassword');
  readonly confirmPass = this.form.get('confirmPassword');
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

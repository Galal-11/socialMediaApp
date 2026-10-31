import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-setting',
  imports: [RouterLink],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css',
})
export class SettingComponent {
  user = JSON.parse(localStorage.getItem('user') ?? 'null');
}

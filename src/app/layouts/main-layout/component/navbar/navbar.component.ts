import { Component, inject, OnInit, signal } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../../core/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  private readonly authService = inject(AuthService);
  prof = signal<Profile[]>([]);
  ngOnInit(): void {
    initFlowbite();
  }
  logOut(): void {
    this.authService.logOut();
  }
  profile(): void {
    this.authService.getMyProfile().subscribe({
      next: (res) => {
        console.log(res.user);
        this.prof.set(res.user);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

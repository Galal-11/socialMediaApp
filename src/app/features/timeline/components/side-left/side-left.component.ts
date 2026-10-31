import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileComponent } from '../../../profile/profile.component';
import { PostsComponent } from '../posts/posts.component';

@Component({
  selector: 'app-side-left',
  imports: [ProfileComponent, PostsComponent],
  templateUrl: './side-left.component.html',
  styleUrl: './side-left.component.css',
})
export class SideLeftComponent {
  private readonly router = inject(Router);

  feed(): void {
    this.router.navigate(['/timeline']);
  }
  myPosts(): void {
    this.router.navigate(['/profile']);
  }
}

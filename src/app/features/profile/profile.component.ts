import { HttpClient } from '@angular/common/http';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../core/auth/services/auth.service';
import { PostsService } from '../timeline/components/posts/services/posts.service';
import { PostsComponent } from '../timeline/components/posts/posts.component';

@Component({
  selector: 'app-profile',
  imports: [PostsComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly postsService = inject(PostsService);
  allPosts = signal<Post[]>([]);
  myPosts = computed(() => {
    return this.allPosts().filter((p) => p.user._id === this.prof()?._id);
  });
  getPostsData() {
    this.postsService.getAllPosts().subscribe({
      next: (res) => {
        console.log(res.data.posts);
        this.allPosts.set(res.data.posts);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ngOnInit(): void {
    this.profile();
    this.getPostsData();
  }
  prof = signal<Profile | null>(null);
  profile(): void {
    this.authService.getMyProfile().subscribe({
      next: (res) => {
        console.log(res);
        this.prof.set(res.data.user);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

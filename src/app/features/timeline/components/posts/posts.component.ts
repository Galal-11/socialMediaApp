import { routes } from './../../../../app.routes';
import { Component, inject, OnInit, signal } from '@angular/core';
import { PostsService } from './services/posts.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { CommentsComponent } from './components/comments/comments.component';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-posts',
  imports: [ReactiveFormsModule, CommentsComponent, RouterLink],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent implements OnInit {
  private readonly postsService = inject(PostsService);
  private readonly activatedRoute = inject(ActivatedRoute);
  allPosts = signal<Post[]>([]);
  files = signal<File | null>(null);
  imgSrc = signal('');
  userId = signal('');
  content = new FormControl('', Validators.required);
  privacy = new FormControl('public');
  isLiked = signal(false);
  likeCount = signal('');
  postId!: string;
  selectedFile: File | null = null;
  user = JSON.parse(localStorage.getItem('user') ?? '');
  editContent = new FormControl('', Validators.required);
  editingId = signal('');
  startEditing(post: any): void {
    this.editingId.set(post._id);
    this.editContent.setValue(post.body);
  }
  ngOnInit(): void {
    this.getPostsData();
    this.userId.set(JSON.parse(localStorage.getItem('user')!)._id);
    // this.postId = this.route.snapshot.paramMap.get('id')!;
  }
  getPostsData() {
    this.postsService.getAllPosts().subscribe({
      next: (res) => {
        console.log(res);
        this.allPosts.set(res.data.posts);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  changeFile(e: Event): void {
    let input = e.target as HTMLInputElement;
    if (input.files) {
      this.files.set(input.files[0]);
      this.imgSrc.set(URL.createObjectURL(input.files[0]));
      this.selectedFile = input.files[0];
    }
  }
  submitData(e: SubmitEvent, myEl: HTMLFormElement): void {
    e.preventDefault();
    let formData = new FormData();
    if (this.content.value) {
      formData.append('body', this.content.value);
    }
    if (this.privacy.value) {
      formData.append('privacy', this.privacy.value);
    }
    if (this.files()) {
      formData.append('image', this.files()!);
      this.imgSrc.set('');
    }

    this.postsService.createPost(formData).subscribe({
      next: (res) => {
        console.log(res);
        this.getPostsData();
        this.imgSrc.set('');
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        myEl.reset();
        this.imgSrc.set('');
      },
    });
  }
  deleteItem(id: string): void {
    this.postsService.deletePost(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.success) {
          this.getPostsData();
        }
      },
    });
  }
  likeAllPosts(id: string): void {
    this.postsService.likePosts(id).subscribe({
      next: (res) => {
        console.log(res);
        console.log(id);
        this.isLiked.set(res.data.liked);
        this.likeCount.set(res.data.likesCount);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  update(id: string): void {
    const data = { body: this.editContent.value ?? '' };

    this.postsService.updatePost(id, data).subscribe({
      next: (res) => {
        console.log(res);
        this.editingId.set('');
        this.getPostsData();
      },
      error: (err) => console.log(err),
    });
  }
}

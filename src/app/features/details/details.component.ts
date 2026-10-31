import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../timeline/components/posts/services/posts.service';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly postsService = inject(PostsService);
  allDetails = signal<Post>({} as Post);
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      console.log(params.get('id'));
      this.getDetails(params.get('id')!);
    });
  }

  getDetails(id: string): void {
    this.postsService.getSinglePost(id).subscribe({
      next: (res) => {
        console.log(res.data.post);
        this.allDetails.set(res.data.post);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

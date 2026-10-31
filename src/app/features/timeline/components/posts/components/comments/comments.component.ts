import { Component, inject, input, OnInit, signal } from '@angular/core';
import { CommentsService } from '../../services/comments.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
// import { Comments } from '../../models/comments.interface';

@Component({
  selector: 'app-comments',
  imports: [ReactiveFormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent implements OnInit {
  private readonly commentsService = inject(CommentsService);
  postId = input.required<string>();
  allComments = signal<any[]>([]);
  commentContent = new FormControl('', { nonNullable: true });
  editCommentContent = new FormControl('', { nonNullable: true });
  editingCommentId: string | null = null;
  startEdit(comment: any): void {
    this.editingCommentId = comment._id;
    this.editCommentContent.setValue(comment.content);
  }

  ngOnInit(): void {
    this.getAllComments();
  }
  getAllComments(): void {
    this.commentsService.getcomments(this.postId()).subscribe({
      next: (res) => {
        console.log(res.data.comments);
        this.allComments.set(res.data.comments);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  sendComment(): void {
    let content = this.commentContent.value;

    this.commentsService.submitComment(this.postId(), { content }).subscribe({
      next: (res) => {
        console.log(res);
        this.getAllComments();
        this.commentContent.reset('');
      },
      error: (err) => {
        console.log(err);
      },
    });

    //   const user = JSON.parse(localStorage.getItem('user') || '{}');

    //   if (!content) return;
    //   this.allComments.update((comments) => [
    //     ...comments,
    //     {
    //       _id: Date.now(),
    //       name: user.name,
    //       username: user.username,
    //       photo: user.photo,
    //       content,
    //       likes: [],
    //       commentCreator: {},
    //     },
    //   ]);
    // }
  }
  deleteComm(commentID: string): void {
    this.commentsService.deleteComment(this.postId(), commentID).subscribe({
      next: (res) => {
        console.log(res);
        this.getAllComments();
        this.commentContent.reset('');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  updateComm(commentId: string): void {
    this.commentsService
      .updateComment(this.postId(), commentId, { content: this.editCommentContent.value })
      .subscribe({
        next: (res) => {
          console.log(res);

          this.editCommentContent.reset();
          this.editingCommentId = null;
          this.getAllComments();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  cancelEdit(): void {
    this.editingCommentId = null;
    this.editCommentContent.reset('');
  }
}

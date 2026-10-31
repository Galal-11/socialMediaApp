import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private readonly httpClient = inject(HttpClient);

  getcomments(postId: string, limit: number = 10): Observable<any> {
    return this.httpClient.get(
      environment.baseUrl + `posts/${postId}/comments?page=1&limit=${limit}`,
    );
  }
  submitComment(postId: string, data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `posts/${postId}/comments`, data);
  }
  deleteComment(postId: string, commentId: String): Observable<any> {
    return this.httpClient.delete(environment.baseUrl + `posts/${postId}/comments/${commentId}`);
  }
  updateComment(postId: string, commentId: String, data: { content: string }): Observable<any> {
    return this.httpClient.put(environment.baseUrl + `posts/${postId}/comments/${commentId}`, data);
  }
}

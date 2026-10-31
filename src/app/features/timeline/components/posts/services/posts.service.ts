import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly httpClient = inject(HttpClient);

  getAllPosts(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `posts`);
  }
  getSinglePost(postId: string): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `posts/${postId}`);
  }
  deletePost(postId: string): Observable<any> {
    return this.httpClient.delete(environment.baseUrl + `/posts/${postId}`);
  }
  createPost(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `posts`, data);
  }
  likePosts(postId: string): Observable<any> {
    return this.httpClient.put(environment.baseUrl + `posts/${postId}/like`, {});
  }
  updatePost(postId: string, data: { body: string }): Observable<any> {
    return this.httpClient.put(environment.baseUrl + `posts/${postId}`, data);
  }
}

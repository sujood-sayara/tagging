import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment } from 'src/models/comment';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  path = 'comments';
  data: any;
  constructor(private httpClient: HttpClient) {}
  getComments() {
    return this.httpClient.get<Comment[]>(`${environment.apiUrl}/${this.path}`);
  }
  getImageComments(imageId) {
    return this.httpClient.get<Comment[]>(
      `${environment.apiUrl}/${this.path}/${imageId}`
    );
  }
  addComment(body) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/${this.path}`,
      body
    );
  }
  deleteComment(id: string) {
    return this.httpClient.delete(`${environment.apiUrl}/${this.path}/${id}`, {
      observe: 'response',
    });
  }
  updateComment(updatedComment: Comment): Observable<any> {
    return this.httpClient.put<Comment>(
      `${environment.apiUrl}/${this.path}/${updatedComment._id}`,
      updatedComment
    );
  }
  saveSelectedImage(data: any) {
    this.data = data;
  }
  getSelectedImage() {
    return this.data;
  }
}

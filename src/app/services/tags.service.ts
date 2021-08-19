import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tag } from '../../models/tag';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  constructor(private httpClient: HttpClient) {}
  getTags() {
    return this.httpClient.get<Tag[]>(`${environment.apiUrl}/tags`);
  }
  addTag(body) {
    return this.httpClient.post<any>(`${environment.apiUrl}/tags`, body);
  }
  deleteTag(id:string){
    return this.httpClient.delete(`${environment.apiUrl}/tags/${id}`);
  }
  updateTag(updatedTag:Tag):Observable<any>{
    return this.httpClient.put<Tag>(`${environment.apiUrl}/tags/${updatedTag._id}`,updatedTag);
  }
}

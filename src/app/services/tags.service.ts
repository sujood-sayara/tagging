import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tag } from '../../models/tag';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  constructor(private httpClient: HttpClient) {}
  gettags() {
    return this.httpClient.get<tag[]>(`${environment.apiUrl}/tags`);
  }
  addtag(body) {
    return this.httpClient.post<any>(`${environment.apiUrl}/tags`, body);
  }
  deletetag(id:string){
    return this.httpClient.delete(`${environment.apiUrl}/tags/${id}`);
  }
}

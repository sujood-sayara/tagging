import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Image } from '../../models/image';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  constructor(private httpClient: HttpClient) {}
  getImages() {
    return this.httpClient.get<Image[]>(`${environment.apiUrl}/images`, {
      observe: 'response',
    });
  }
  addImage(form) {
    var formData: any = new FormData();
    formData.append('name', form.name);
    formData.append('tagIds', form.tagIds);
    formData.append('imageFile', form.image);

    return this.httpClient.post(`${environment.apiUrl}/images`, formData);
  }
  deleteImage(imageId: string) {
    return this.httpClient.delete(`${environment.apiUrl}/images/${imageId}`);
  }
  getImageById(imageId: string) {
    return this.httpClient.get<Image>(
      `${environment.apiUrl}/images/${imageId}`
    );
  }
  updateImage(updateImage: Image): Observable<any> {
    return this.httpClient.put<Image>(
      `${environment.apiUrl}/images/${updateImage.id}`,
      updateImage
    );
  }
}

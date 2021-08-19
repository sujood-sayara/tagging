import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  AddImageAction,
  AddImageSuccessAction,
  deleteImageAction,
  deleteImageSuccessAction,
  imagesActionTypes,
  LoadImageAction,
  LoadImageFailureAction,
  LoadImageSuccessAction,
  updateImageAction,
  updateImageSuccessAction,
} from 'src/actions/image.action';
import { ImagesService } from '../services/images.service';

@Injectable()
export class imageEffects {
  @Effect()
  loadImages$ = this.actions$.pipe(
    ofType<LoadImageAction>(imagesActionTypes.LOAD_images),
    mergeMap(() =>
      this.imageservice.getImages().pipe(
        map((data) => {
          return new LoadImageSuccessAction(data['images']);
        }),
        catchError((error) => of(new LoadImageFailureAction(error)))
      )
    )
  );
  addimage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(imagesActionTypes.ADD_images),
      map((action: AddImageAction) => action.payload),
      switchMap((newTag) => this.imageservice.addImage(newTag)),
      map((response: any) => {
        return new AddImageSuccessAction(response.createdImage);
      })
    )
  );

  deleteimages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(imagesActionTypes.DELETE_images),
      map((action: deleteImageAction) => action.payload),
      switchMap((imageId) => this.imageservice.deleteImage(imageId)),
      map(() => {
        return new deleteImageSuccessAction();
      })
    )
  );

  updateimages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(imagesActionTypes.UPDATE_images),
      map((action: updateImageAction) => action.payload),
      switchMap((image) => this.imageservice.updateImage(image)),
      map(() => {
        return new updateImageSuccessAction();
      })
    )
  );
  constructor(private actions$: Actions, private imageservice: ImagesService) {}
}

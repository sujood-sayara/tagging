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
  LoadCammentFailureAction,
  LoadCommentAction,
  LoadCommentSuccessAction,
  LoadImageAction,
  LoadImageFailureAction,
  LoadImageSuccessAction,
  updateImageAction,
  updateImageSuccessAction,
} from 'src/actions/image.action';
import { ImagesService } from '../services/images.service';
import { CommentsService } from '../services/comments.service';
import { Comment } from 'src/models/comment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class imageEffects {
  loadImages$ = createEffect(() =>
    this.actions$.pipe(
      ofType<LoadImageAction>(imagesActionTypes.LOAD_images),
      mergeMap(() =>
        this.imageservice.getImages().pipe(
          map((data: any) => {
            return new LoadImageSuccessAction(data.body['images']);
          }),
          catchError((error) => of(new LoadImageFailureAction(error)))
        )
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
      map((data: any) => {
        this.snackBar.open('Delete done Successfully', 'x', {
          duration: 2000,
        });
        return new deleteImageSuccessAction();
      }),
      catchError((err) => {
        this.snackBar.open('Could not delete image', 'x', {
          duration: 2000,
        });
        return of(err);
      })
    )
  );

  updateimages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(imagesActionTypes.UPDATE_images),
      map((action: updateImageAction) => action.payload),
      mergeMap((image) => this.imageservice.updateImage(image)),
      map(() => {
        return new updateImageSuccessAction();
      })
    )
  );

  constructor(
    private actions$: Actions,
    private imageservice: ImagesService,
    private commmentservice: CommentsService,
    private snackBar: MatSnackBar
  ) {}
}

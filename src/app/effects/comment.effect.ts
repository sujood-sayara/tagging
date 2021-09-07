import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommentsService } from '../services/comments.service';
import {
  LoadCommentAction,
  commentsActionTypes,
  LoadCommentSuccessAction,
  LoadCammentFailureAction,
  addCommentAction,
  AddCommentSuccessAction,
  deleteCommentAction,
} from 'src/actions/comment.action';

@Injectable()
export class commentEffects {
  loadComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType<LoadCommentAction>(commentsActionTypes.LOAD_comments),
      mergeMap((data) => {
        const imageId = data.imageId;
        return this.commentservice.getImageComments(data.imageId).pipe(
          map((data) => {
            return new LoadCommentSuccessAction(imageId, data);
          }),
          catchError((error) => of(new LoadCammentFailureAction(error)))
        );
      })
    )
  );
  addComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(commentsActionTypes.ADD_comments),
      map((action: addCommentAction) => action.payload),
      switchMap((newComment) => this.commentservice.addComment(newComment)),
      map((response) => {
        return new AddCommentSuccessAction(response);
      })
    )
  );

  constructor(
    private actions$: Actions,
    private commentservice: CommentsService,
    private snackBar: MatSnackBar
  ) {}
}

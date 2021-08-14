import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import {
  map,
  mergeMap,
  catchError,
  exhaustMap,
  switchMap,
} from 'rxjs/operators';
import { Action } from '@ngrx/store';
import {
  tagsActionTypes,
  LoadTagAction,
  LoadTagSuccessAction,
  LoadTagFailureAction,
  addTagAction,
  AddTagSuccessAction,
  deleteTagSuccessAction,
  deleteTagAction,
} from 'src/actions/tag.action';
import { Observable, of } from 'rxjs';
import { TagsService } from '../services/tags.service';


@Injectable()
export class tagEffects {
  @Effect()
  loadtags$ = this.actions$.pipe(
    ofType<LoadTagAction>(tagsActionTypes.LOAD_tags),
    mergeMap(() =>
      this.tagservice.gettags().pipe(
        map((data) => {
          return new LoadTagSuccessAction(data);
        }),
        catchError((error) => of(new LoadTagFailureAction(error)))
      )
    )
  );

  addtags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(tagsActionTypes.ADD_tags),
      map((action: addTagAction) => action.payload),
      switchMap((newTag) => this.tagservice.addtag(newTag)),
      map((response) => {
        return new AddTagSuccessAction(response);
      })
    )
  );
  deletetags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(tagsActionTypes.DELETE_tags),
      map((action: deleteTagAction) => action.payload),
      switchMap((tagId) => this.tagservice.deletetag(tagId)),
      map(() => {
        return new deleteTagSuccessAction();
      })
    )
  );

  constructor(private actions$: Actions, private tagservice: TagsService) {}
}

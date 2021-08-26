import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import {
  tagsActionTypes,
  LoadTagAction,
  LoadTagSuccessAction,
  LoadTagFailureAction,
  addTagAction,
  AddTagSuccessAction,
  deleteTagSuccessAction,
  deleteTagAction,
  updateTagAction,
  updateTagSuccessAction,
} from 'src/actions/tag.action';
import { of } from 'rxjs';
import { TagsService } from '../services/tags.service';

@Injectable()
export class tagEffects {
  @Effect() // change to create effect over effect
  loadtags$ = this.actions$.pipe(
    ofType<LoadTagAction>(tagsActionTypes.LOAD_tags),
    mergeMap(() =>
      this.tagservice.getTags().pipe(
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
      switchMap((newTag) => this.tagservice.addTag(newTag)),
      map((response) => {
        return new AddTagSuccessAction(response);
      })
    )
  );
  deletetags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(tagsActionTypes.DELETE_tags),
      map((action: deleteTagAction) => action.payload),
      switchMap((tagId) => this.tagservice.deleteTag(tagId)),
      map(() => {
        return new deleteTagSuccessAction();
      })
    )
  );
  updatetags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(tagsActionTypes.UPDATE_tags),
      map((action: updateTagAction) => action.payload),
      switchMap((tag) => this.tagservice.updateTag(tag)), // mergeMap over switchMap
      map(() => {
        return new updateTagSuccessAction();
      })
    )
  );

  constructor(private actions$: Actions, private tagservice: TagsService) {}
}

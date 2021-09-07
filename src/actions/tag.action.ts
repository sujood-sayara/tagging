import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Tag } from 'src/models/tag';

export enum tagsActionTypes {
  LOAD_tags = '[tags] Load tags',
  LOAD_tags_SUCCESS = '[tags] Load tags Success',
  LOAD_tgs_FAILURE = '[tags] Load tags Failure',

  ADD_tags = '[tags] add tags',
  ADD_tags_Success = '[tags] add tags Success',

  DELETE_tags = '[tags] delete tags',
  DELETE_tags_Success = '[tags] delete tags Success',

  UPDATE_tags = '[tags] update tags',
  UPDATE_tags_Success = '[tags] update tags Success',
  DELETE_tags_Failed = '[tags] delete tags Failed',
}

export class LoadTagAction implements Action {
  readonly type = tagsActionTypes.LOAD_tags;
}

export class LoadTagSuccessAction implements Action {
  readonly type = tagsActionTypes.LOAD_tags_SUCCESS;
  constructor(public payload: Array<Tag>) {}
}

export class LoadTagFailureAction implements Action {
  readonly type = tagsActionTypes.LOAD_tgs_FAILURE;
  constructor(public payload: Error) {}
}

export class addTagAction implements Action {
  readonly type = tagsActionTypes.ADD_tags;
  constructor(public payload: Tag) {}
}

export class AddTagSuccessAction implements Action {
  readonly type = tagsActionTypes.ADD_tags_Success;
  constructor(public payload: Tag) {}
}

export class deleteTagAction implements Action {
  readonly type = tagsActionTypes.DELETE_tags;
  constructor(public payload: string) {}
}

export class deleteTagSuccessAction implements Action {
  readonly type = tagsActionTypes.DELETE_tags_Success;
  constructor(public payload: string) {}
}
export class updateTagAction implements Action {
  readonly type = tagsActionTypes.UPDATE_tags;
  constructor(public payload: Tag) {}
}

export class updateTagSuccessAction implements Action {
  readonly type = tagsActionTypes.UPDATE_tags_Success;
}

export class failedToDeleteTagAction implements Action {
  readonly type = tagsActionTypes.DELETE_tags_Failed;
}

export type tagAction =
  | LoadTagAction
  | LoadTagFailureAction
  | LoadTagSuccessAction
  | addTagAction
  | AddTagSuccessAction
  | deleteTagSuccessAction
  | deleteTagAction
  | updateTagAction
  | updateTagSuccessAction
  | failedToDeleteTagAction;

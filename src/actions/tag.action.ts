import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { tag } from 'src/models/tag';

export enum tagsActionTypes {
  LOAD_tags = '[tags] Load tags',
  LOAD_tags_SUCCESS = '[tags] Load tags Success',
  LOAD_tgs_FAILURE = '[tags] Load tags Failure',

  ADD_tags = '[tags] add tags',
  ADD_tags_Success ='[tags] add tags Success',

  DELETE_tags = '[tags] delete tags',
  DELETE_tags_Success ='[tags] delete tags Success',
}

export class LoadTagAction implements Action {
  readonly type = tagsActionTypes.LOAD_tags;
}

export class LoadTagSuccessAction implements Action {
  readonly type = tagsActionTypes.LOAD_tags_SUCCESS;
  constructor(public payload: Array<tag>) {}
}

export class LoadTagFailureAction implements Action {
  readonly type = tagsActionTypes.LOAD_tgs_FAILURE;
  constructor(public payload: Error) {}
}

export class addTagAction implements Action {
  readonly type = tagsActionTypes.ADD_tags;
  constructor(public payload: tag) {}
}

export class AddTagSuccessAction implements Action{
  readonly type = tagsActionTypes.ADD_tags_Success
  constructor(public payload: tag) {}
}

export class deleteTagAction implements Action {
  readonly type = tagsActionTypes.DELETE_tags;
  constructor(public payload: string) {}
}

export class deleteTagSuccessAction implements Action{
  readonly type = tagsActionTypes.DELETE_tags_Success
  
}

export type tagAction =
  | LoadTagAction
  | LoadTagFailureAction
  | LoadTagSuccessAction
  | addTagAction
  | AddTagSuccessAction
  | deleteTagSuccessAction
  | deleteTagAction;

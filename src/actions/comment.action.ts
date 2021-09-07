import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Comment } from 'src/models/comment';

export enum commentsActionTypes {
  LOAD_comments = '[comments] Load comments',
  LOAD_comments_SUCCESS = '[comments] Load comments Success',
  LOAD_comments_FAILURE = '[comments] Load comments Failure',

  ADD_comments = '[comments] add comments',
  ADD_comments_Success = '[comments] add comments Success',

  DELETE_comments = '[comments] delete comments',
  DELETE_comments_Success = '[comments] delete comments Success',

  UPDATE_comments = '[comments] update comments',
  UPDATE_comments_Success = '[comments] update comments Success',
  DELETE_comments_Failed = '[comments] delete comments Failed',
}

export class LoadCommentAction implements Action {
  readonly type = commentsActionTypes.LOAD_comments;
  constructor(public imageId: string) {}
}

export class LoadCommentSuccessAction implements Action {
  readonly type = commentsActionTypes.LOAD_comments_SUCCESS;
  constructor(public imageId: string, public payload: Comment[]) {}
}

export class LoadCammentFailureAction implements Action {
  readonly type = commentsActionTypes.LOAD_comments_FAILURE;
  constructor(public payload: Error) {}
}

export class addCommentAction implements Action {
  readonly type = commentsActionTypes.ADD_comments;
  constructor(public payload: Comment) {}
}

export class AddCommentSuccessAction implements Action {
  readonly type = commentsActionTypes.ADD_comments_Success;
  constructor(public payload: Comment) {}
}

export class deleteCommentAction implements Action {
  readonly type = commentsActionTypes.DELETE_comments;
  constructor(public payload: string) {}
}

export class deleteCommentSuccessAction implements Action {
  readonly type = commentsActionTypes.DELETE_comments_Success;
  constructor(public imageId: string, public commentId: string) {}
}
export class updateCommentAction implements Action {
  readonly type = commentsActionTypes.UPDATE_comments;
  constructor(public payload: Comment) {}
}

export class updateCommentSuccessAction implements Action {
  readonly type = commentsActionTypes.UPDATE_comments_Success;
  constructor(
    public imageId: string,
    public commentId: string,
    public payload: Comment
  ) {}
}

export class failedToDeleteCommentAction implements Action {
  readonly type = commentsActionTypes.DELETE_comments_Failed;
}

export type commentAction =
  | LoadCommentAction
  | LoadCammentFailureAction
  | LoadCommentSuccessAction
  | addCommentAction
  | AddCommentSuccessAction
  | deleteCommentSuccessAction
  | deleteCommentAction
  | updateCommentAction
  | updateCommentSuccessAction
  | failedToDeleteCommentAction;

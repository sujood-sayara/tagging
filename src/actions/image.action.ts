import { Action } from '@ngrx/store';
import { Comment } from 'src/models/comment';
import { Image } from 'src/models/image';

export enum imagesActionTypes {
  LOAD_images = '[images] Load images',
  LOAD_images_SUCCESS = '[images] Load images Success',
  LOAD_images_FAILURE = '[images] Load images Failure',
  LOAD_comments = '[comments] Load comments',
  LOAD_comments_SUCCESS = '[comments] Load comments Success',
  LOAD_comments_FAILURE = '[comments] Load comments Failure',

  ADD_comments = '[comments] add comments',
  ADD_comments_Success = '[comments] add comments Success',
  ADD_images = '[images] add images',
  ADD_images_Success = '[images] add images Success',

  DELETE_images = '[images] delete images',
  DELETE_images_Success = '[images] delete images Success',

  UPDATE_images = '[images] update images',
  UPDATE_images_Success = '[images] update images Success',
}

export class LoadImageAction implements Action {
  readonly type = imagesActionTypes.LOAD_images;
}

export class LoadImageSuccessAction implements Action {
  readonly type = imagesActionTypes.LOAD_images_SUCCESS;
  constructor(public payload: Image[]) {}
}

export class LoadImageFailureAction implements Action {
  readonly type = imagesActionTypes.LOAD_images_FAILURE;
  constructor(public payload: Error) {}
}
export class AddImageAction implements Action {
  readonly type = imagesActionTypes.ADD_images;
  constructor(public payload: Image) {}
}

export class AddImageSuccessAction implements Action {
  readonly type = imagesActionTypes.ADD_images_Success;
  constructor(public payload: any) {}
}
export class deleteImageAction implements Action {
  readonly type = imagesActionTypes.DELETE_images;
  constructor(public payload: string) {}
}

export class deleteImageSuccessAction implements Action {
  readonly type = imagesActionTypes.DELETE_images_Success;
}
export class updateImageAction implements Action {
  readonly type = imagesActionTypes.UPDATE_images;
  constructor(public payload: Image) {}
}

export class updateImageSuccessAction implements Action {
  readonly type = imagesActionTypes.UPDATE_images_Success;
}
export class LoadCommentAction implements Action {
  readonly type = imagesActionTypes.LOAD_comments;
  constructor(public imageId: string) {}
}

export class LoadCommentSuccessAction implements Action {
  readonly type = imagesActionTypes.LOAD_comments_SUCCESS;
  constructor(public imageId: string, public payload: Comment[]) {}
}

export class LoadCammentFailureAction implements Action {
  readonly type = imagesActionTypes.LOAD_comments_FAILURE;
  constructor(public payload: Error) {}
}

export class addCommentAction implements Action {
  readonly type = imagesActionTypes.ADD_comments;
  constructor(public payload: Comment) {}
}

export class AddCommentSuccessAction implements Action {
  readonly type = imagesActionTypes.ADD_comments_Success;
  constructor(public payload: Comment) {}
}

export type imageAction =
  | LoadImageAction
  | LoadImageFailureAction
  | LoadImageSuccessAction
  | AddImageAction
  | AddImageSuccessAction
  | deleteImageAction
  | deleteImageSuccessAction
  | updateImageAction
  | updateImageSuccessAction
  | LoadCommentAction
  | LoadCammentFailureAction
  | LoadCommentSuccessAction
  | addCommentAction
  | AddCommentSuccessAction;

import { Action } from '@ngrx/store';
import { Image } from 'src/models/image';

export enum imagesActionTypes {
  LOAD_images = '[images] Load images',
  LOAD_images_SUCCESS = '[images] Load images Success',
  LOAD_images_FAILURE = '[images] Load images Failure',

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

export type imageAction =
  | LoadImageAction
  | LoadImageFailureAction
  | LoadImageSuccessAction
  | AddImageAction
  | AddImageSuccessAction
  | deleteImageAction
  | deleteImageSuccessAction
  | updateImageAction
  | updateImageSuccessAction;

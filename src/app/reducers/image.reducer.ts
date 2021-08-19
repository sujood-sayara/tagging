import { imagesActionTypes } from '../../actions/image.action';
import { imageAction } from '../../actions/image.action';
import { Image } from 'src/models/image';
import * as _ from 'lodash';

export interface imageState {
  images: Image[];
  loaded: boolean;
}

const initialState: imageState = {
  images: [],
  loaded: false,
};

export function reducerimage(
  state: imageState = initialState,
  action: imageAction
) {
  switch (action.type) {
    case imagesActionTypes.LOAD_images:
      return {
        ...state,
      };
    case imagesActionTypes.LOAD_images_SUCCESS:
      return {
        ...state,
        images: [...action.payload],
        loaded: true,
      };

    case imagesActionTypes.LOAD_images_FAILURE:
      return {
        ...state,
      };
    case imagesActionTypes.ADD_images:
      return {
        ...state,
      };
    case imagesActionTypes.ADD_images_Success:
      const image = {
        id: action.payload._id,
        name: action.payload.name,
        tagIds: action.payload.tagIds,
        imageUrl: action.payload.request.url,
      };
      return {
        ...state,
        images: [image, ...state.images],
      };
    case imagesActionTypes.DELETE_images:
      return {
        ...state,
        images: [
          ...state.images.filter((image) => image.id !== action.payload),
        ],
      };
    case imagesActionTypes.DELETE_images_Success:
      return {
        ...state,
      };
    case imagesActionTypes.UPDATE_images:
      const stateCopy = _.cloneDeep(state);

      let index = stateCopy.images.findIndex((image) => {
        return image.id === action.payload.id;
      });
      stateCopy.images[index] = action.payload;

      return {
        stateCopy,
      };
    case imagesActionTypes.UPDATE_images_Success:
      return {
        ...state,
      };
    default:
      return state;
  }
}

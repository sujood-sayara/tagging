import { tagsActionTypes } from '../../actions/tag.action';
import { tagAction } from '../../actions/tag.action';
import { Tag } from 'src/models/tag';
import * as _ from 'lodash';

export interface tagState {
  tags: Tag[];

  loaded: boolean;
}

const initialState: tagState = {
  tags: [],

  loaded: false,
};

export function reducertag(state: tagState = initialState, action: tagAction) {
  switch (action.type) {
    case tagsActionTypes.LOAD_tags:
      return {
        ...state,
      };
    case tagsActionTypes.LOAD_tags_SUCCESS:
      return {
        ...state,
        tags: [...action.payload],
        loaded: true,
      };

    case tagsActionTypes.LOAD_tgs_FAILURE:
      return {
        ...state,
      };
    case tagsActionTypes.ADD_tags:
      return {
        ...state,
      };
    case tagsActionTypes.ADD_tags_Success:
      return {
        ...state,
        tags: [action.payload, ...state.tags],
      };
    case tagsActionTypes.DELETE_tags:
      return {
        ...state,
      };

    case tagsActionTypes.DELETE_tags_Success:
      return {
        ...state,
        tags: [...state.tags.filter((tag) => tag._id !== action.payload)],
      };
    case tagsActionTypes.UPDATE_tags:
      const stateCopy = _.cloneDeep(state);

      let index = stateCopy.tags.findIndex((tag) => {
        return tag._id === action.payload._id;
      });
      stateCopy.tags[index] = action.payload;

      return {
        stateCopy,
      };
    case tagsActionTypes.UPDATE_tags_Success:
      return {
        ...state,
      };
    default:
      return state;
  }
}

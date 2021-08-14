import { tagsActionTypes } from '../../actions/tag.action';
import { tagAction } from '../../actions/tag.action';
import { tag } from 'src/models/tag';

export interface tagState {
  tags: tag[];
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
        tags: [...state.tags.filter((tag) => tag._id !== action.payload)],
      };
    case tagsActionTypes.DELETE_tags_Success:
      return {
        ...state,
      };
    default:
      return state;
  }
}

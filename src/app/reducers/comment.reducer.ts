import { commentsActionTypes } from '../../actions/comment.action';
import { commentAction } from '../../actions/comment.action';
import { Comment } from 'src/models/comment';
import * as _ from 'lodash';


export interface commentState {
  imageComments: { key: string; value: Comment[] }[];
}

const initialState: commentState = {
  imageComments: [],
};

export function reducerComment(
  state: commentState = initialState,
  action: commentAction
) {
  switch (action.type) {
    case commentsActionTypes.LOAD_comments:
      return {
        ...state,
      };
    case commentsActionTypes.LOAD_comments_SUCCESS:
      return {
        ...state,
        imageComments: [
          ...state.imageComments,
          { key: action.imageId, value: action.payload },
        ],
      };

    case commentsActionTypes.LOAD_comments_FAILURE:
      return {
        ...state,
      };
    case commentsActionTypes.ADD_comments:
      return {
        ...state,
      };
    case commentsActionTypes.ADD_comments_Success:
      return {
        ...state,
        imageComments: [
          ...state.imageComments.filter(
            (imageData) => imageData.key !== action.payload.imageId
          ),
          {
            key: action.payload.imageId,
            value: [
              ...state.imageComments.find(
                (imageData) => imageData.key === action.payload.imageId
              )?.value,
              action.payload,
            ],
          },
        ],
      };
    case commentsActionTypes.DELETE_comments:
      return {
        ...state,
      };

    case commentsActionTypes.DELETE_comments_Success:
      const index = state.imageComments.findIndex(
        (imageComments) => imageComments.key === action.imageId
      );

      return {
        ...state,
        imageComments: [
          state.imageComments[index].value.filter(
            (comment) => comment._id !== action.commentId
          ),
        ],
      };
    case commentsActionTypes.UPDATE_comments:
      return {
        ...state,
      };
    case commentsActionTypes.UPDATE_comments_Success:
      const stateCopy = _.cloneDeep(state);
      let imageIndex = state.imageComments.findIndex(
        (imageComments) => imageComments.key === action.imageId
      );
      let commentIndex = state.imageComments[imageIndex].value.findIndex(
        (comment) => comment._id === action.commentId
      );
      stateCopy.imageComments[imageIndex].value[commentIndex] = action.payload;

      return {
        ...stateCopy,
      };
    default:
      return state;
  }
}

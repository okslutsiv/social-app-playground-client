import {
  TOGLE_LOADING_SCREAM,
  OPEN_SCREAM_DIALOG,
  SET_SCREAM,
  CLEAR_SCREAM,
  CLOSE_SCREAM_DIALOG,
  SUBMIT_COMMENT,
  DELETE_COMMENT,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
} from "../types";

const initialState = {
  loadingScream: false,
  screamDialogId: null,
  scream: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TOGLE_LOADING_SCREAM:
      return {
        ...state,
        loadingScream: !state.loadingScream,
      };
    case OPEN_SCREAM_DIALOG:
      return {
        ...state,
        screamDialogId: action.payload,
      };
    case CLOSE_SCREAM_DIALOG:
      return {
        ...state,
        screamDialogId: null,
        scream: {},
      };
    case SET_SCREAM:
      return {
        ...state,
        scream: {
          comments: action.payload.comments,
          screamId: action.payload.screamId,
          ...action.payload.data,
        },
      };
    case CLEAR_SCREAM:
      return {
        ...state,
        scream: {},
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        scream: {
          ...state.scream,
          commentsCount: state.scream.commentsCount + 1,
          comments: [action.payload, ...state.scream.comments],
        },
      };

    case DELETE_COMMENT:
      const filteredComments = state.scream.comments.filter(
        comment => comment.commentId !== action.payload.commentId,
      );

      return {
        ...state,
        scream: {
          ...state.scream,
          commentsCount: state.scream.commentsCount - 1,
          comments: filteredComments,
        },
      };
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      if (state.screamDialogId === action.payload.screamId)
        return {
          ...state,
          scream: {
            ...state.scream,
            likesCount: action.payload.likesCount,
          },
        };
      return state;

    default:
      return state;
  }
}

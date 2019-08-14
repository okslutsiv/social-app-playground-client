import {
  TOGLE_LOADING_PAGE,
  SET_SCREAMS,
  SET_AUTHOR,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  POST_SCREAM,
  SUBMIT_COMMENT,
  DELETE_COMMENT,
} from "../types";

const initialState = {
  loadingPage: false,
  screams: [],
  author: {},
};
export default function(state = initialState, action) {
  switch (action.type) {
    case TOGLE_LOADING_PAGE:
      return {
        ...state,
        loadingPage: !state.loadingPage,
      };
    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload.screams,
      };
    case SET_AUTHOR:
      return {
        ...state,
        author: action.payload.author,
      };
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      let index = state.screams.findIndex(
        scream => scream.screamId === action.payload.screamId,
      );
      state.screams[index] = action.payload;

      // if (state.scream.screamId === action.payload.screamId)
      //   state.scream = action.payload;
      return {
        ...state,
      };

    case DELETE_SCREAM:
      const filteredScreams = state.screams.filter(
        scream => scream.screamId !== action.payload,
      );
      return {
        ...state,
        screams: filteredScreams,
      };
    case POST_SCREAM:
      return {
        ...state,
        screams: [{ ...action.payload }, ...state.screams],
      };
    case SUBMIT_COMMENT:
      let index1 = state.screams.findIndex(
        scream => scream.screamId === action.payload.screamId,
      );
      state.screams[index1] && state.screams[index1].commentsCount++;
      return state;
    //     scream: {
    //       ...state.scream,
    //       commentsCount: state.scream.commentsCount + 1,
    //       comments: [action.payload, ...state.scream.comments],
    //     },
    //   };

    case DELETE_COMMENT:
      let index2 = state.screams.findIndex(
        scream => scream.screamId === action.payload.screamId,
      );
      state.screams[index2].commentsCount--;

      //   const filteredComments = state.scream.comments.filter(
      //     comment => comment.commentId !== action.payload.commentId,
      //   );

      return state;
    //     scream: {
    //       ...state.scream,
    //       commentsCount: state.scream.commentsCount - 1,
    //       comments: filteredComments,
    //     },
    //   };

    default:
      return state;
  }
}

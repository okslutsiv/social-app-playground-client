import {
  TOGLE_LOADING_AUTH,
  SET_AUTH_ERRORS,
  CLEAR_AUTH_ERRORS,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
} from "../types";

const initialState = {
  loadingAuth: false,
  errors: null,
  authenticated: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TOGLE_LOADING_AUTH:
      return {
        ...state,
        loadingAuth: !state.loadingAuth,
      };
    case SET_AUTH_ERRORS:
      let errorMsg = action.payload.includes("400")
        ? "Wrong credentials"
        : "Wrong password";
      return {
        ...state,
        errors: errorMsg,
      };
    case CLEAR_AUTH_ERRORS:
      return {
        ...state,
        errors: null,
      };

    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    default:
      return state;
  }
}

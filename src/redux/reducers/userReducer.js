import {
  TOGLE_LOADING_USERDATA,
  SET_USER,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  MARK_NOTIFICATION_READ,
} from "../types";

const initialState = {
  // authenticated: false,
  profile: {},
  loadingUser: false,
  notifications: [],
  likes: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TOGLE_LOADING_USERDATA:
      return {
        ...state,
        loadingUser: !state.loadingUser,
      };
    case SET_USER:
      return {
        ...state,
        ...action.payload,
      };

    case LIKE_SCREAM:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userName: state.profile.userName,
            screamId: action.payload.screamId,
          },
        ],
      };
    case UNLIKE_SCREAM:
      return {
        ...state,
        likes: state.likes.filter(
          like => like.screamId !== action.payload.screamId,
        ),
      };
    case MARK_NOTIFICATION_READ:
      const filtered = state.notifications.filter(
        notification => notification.notificationId !== action.payload,
      );
      return {
        ...state,
        notifications: filtered,
      };
    default:
      return state;
  }
}

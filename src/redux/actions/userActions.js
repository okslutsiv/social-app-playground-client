import axios from "axios";

import {
  TOGLE_LOADING_AUTH,
  SET_AUTH_ERRORS,
  CLEAR_AUTH_ERRORS,
  TOGLE_LOADING_USERDATA,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_USER,
  MARK_NOTIFICATION_READ,
} from "../types";

const setAuthenticationToken = token => {
  const FBIdToken = `Bearer ${token}`;
  window.localStorage.setItem("FBIdToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};

export const getUserData = () => dispatch => {
  dispatch({ type: TOGLE_LOADING_USERDATA });
  axios
    .get("/user/me")
    .then(res => {
      if (res.status !== 200) throw new Error(res.data.error);
      dispatch({ type: TOGLE_LOADING_USERDATA });
      dispatch({ type: SET_USER, payload: res.data });
    })
    .catch(err => {
      console.error(err);
      dispatch({ type: TOGLE_LOADING_USERDATA });
    });
};
export const clearAuthErors = () => dispatch => {
  dispatch({ type: CLEAR_AUTH_ERRORS });
};
export const loginUser = (userData, history) => dispatch => {
  dispatch({ type: TOGLE_LOADING_AUTH });
  axios
    .post("/login", userData)
    .then(res => {
      const token = res.data.token;
      setAuthenticationToken(token);
      dispatch({ type: SET_AUTHENTICATED });
      dispatch(getUserData());
      clearAuthErors();
      dispatch({ type: TOGLE_LOADING_AUTH });
      history.push("/");
    })
    .catch(err => {
      console.error(err.message);
      dispatch({ type: TOGLE_LOADING_AUTH });
      dispatch({ type: SET_AUTH_ERRORS, payload: err.message });
    });
};

export const signupUser = (newUserData, history) => dispatch => {
  dispatch({ type: TOGLE_LOADING_AUTH });
  axios
    .post("signup", newUserData)
    .then(res => {
      const token = res.data.token;
      setAuthenticationToken(token);
      dispatch({ type: SET_AUTHENTICATED });
      dispatch(getUserData());
      clearAuthErors();
      dispatch({ type: TOGLE_LOADING_AUTH });
      history.push("/");
    })
    .catch(err => {
      console.error(err.message);
      console.error(err);

      dispatch({ type: TOGLE_LOADING_AUTH });
      dispatch({ type: SET_AUTH_ERRORS, payload: err.message });
    });
};
export const logoutUser = () => dispatch => {
  localStorage.removeItem("FBIdToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const uploadImage = formData => dispatch => {
  dispatch({ type: TOGLE_LOADING_USERDATA });
  axios
    .post("/user/image", formData)
    .then(res => {
      if (res.status !== 200) throw new Error(res.data.error);
      dispatch({ type: TOGLE_LOADING_USERDATA });
      dispatch(getUserData());
    })
    .catch(err => {
      dispatch({ type: TOGLE_LOADING_USERDATA });
      console.error(err);
    });
};

export const editUserDetails = userDetails => dispatch => {
  dispatch({ type: TOGLE_LOADING_USERDATA });
  axios
    .post("/user/edit", userDetails)
    .then(res => {
      if (res.status !== 200) throw new Error(res.data.error);
      dispatch({ type: TOGLE_LOADING_USERDATA });
      dispatch(getUserData());
    })
    .catch(err => {
      dispatch({ type: TOGLE_LOADING_USERDATA });
      console.error(err);
    });
};

export const markNotificationRead = (userName, notificationId) => dispatch => {
  axios
    .post(`/user/${userName}/notification/${notificationId}`, notificationId)
    .then(res => {
      if (res.status !== 200) throw new Error(res.data.error);

      dispatch({
        type: MARK_NOTIFICATION_READ,
        payload: notificationId,
      });
    })
    .catch(err => console.error(err));
};

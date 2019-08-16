import {
  TOGLE_LOADING_PAGE,
  SET_SCREAMS,
  SET_AUTHOR,
  POST_SCREAM,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
} from "../types";

import axios from "axios";

//get screams

export const getScreams = () => dispatch => {
  dispatch({ type: TOGLE_LOADING_PAGE });
  axios
    .get("/screams")
    .then(res => {
      if (res.status !== 200) throw new Error(res.data.error);
      dispatch({ type: TOGLE_LOADING_PAGE });
      dispatch({ type: SET_SCREAMS, payload: { screams: res.data } });
    })
    .catch(err => {
      console.error(err);
      dispatch({ type: TOGLE_LOADING_PAGE });
      dispatch({ type: SET_SCREAMS, payload: { screams: [] } });
    });
};

// get userPage data
export const getUserpageData = userName => dispatch => {
  dispatch({ type: TOGLE_LOADING_PAGE });
  axios
    .get(`/user/${userName}`)
    .then(res => {
      console.log(res.status);
      dispatch({ type: SET_SCREAMS, payload: { screams: res.data.screams } });
      dispatch({ type: SET_AUTHOR, payload: { author: res.data.profile } });
      dispatch({ type: TOGLE_LOADING_PAGE });
    })
    .catch(err => {
      console.error(err);
      dispatch({ type: SET_SCREAMS, payload: { screams: [] } });
      dispatch({ type: SET_AUTHOR, payload: { author: {} } });
      dispatch({ type: TOGLE_LOADING_PAGE });
    });
};

export const likeScream = screamId => dispatch => {
  axios
    .get(`/scream/${screamId}/like`)
    .then(res => {
      if (res.status !== 200) throw new Error(res.data.error);
      dispatch({ type: LIKE_SCREAM, payload: { ...res.data, screamId } });
    })

    .catch(err => {
      console.error(err);
      console.error("Cannot commit the like");
    });
};

export const unlikeScream = screamId => dispatch => {
  axios
    .get(`/scream/${screamId}/unlike`)
    .then(res => {
      if (res.status !== 200) throw new Error(res.data.error);
      dispatch({ type: UNLIKE_SCREAM, payload: { ...res.data, screamId } });
    })
    .catch(err => {
      console.error(err);
      console.error("Cannot commit the unlike");
    });
};

export const deleteScream = screamId => dispatch => {
  axios
    .delete(`/scream/${screamId}`)
    .then(res => {
      if (res.status !== 200) throw new Error(res.data.error);

      dispatch({ type: DELETE_SCREAM, payload: screamId });
    })
    .catch(err => console.error(err));
};
export const addScream = newScream => dispatch => {
  dispatch({ type: TOGLE_LOADING_PAGE });

  axios
    .post("/scream", newScream)
    .then(res => {
      if (res.status !== 200) throw new Error(res.data.error);
      dispatch({
        type: POST_SCREAM,
        payload: res.data,
      });
      dispatch({ type: TOGLE_LOADING_PAGE });
    })
    .catch(err => {
      console.error(err);
      dispatch({ type: TOGLE_LOADING_PAGE });
    });
};

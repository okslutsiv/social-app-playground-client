import {
  TOGLE_LOADING_SCREAM,
  OPEN_SCREAM_DIALOG,
  SET_SCREAM,
  CLOSE_SCREAM_DIALOG,
  SUBMIT_COMMENT,
  DELETE_COMMENT,
} from "../types";

import axios from "axios";

export const openScreamDialog = screamId => dispatch => {
  dispatch({ type: OPEN_SCREAM_DIALOG, payload: screamId });
};

export const getScreamData = screamId => dispatch => {
  dispatch({ type: TOGLE_LOADING_SCREAM });

  axios
    .get(`/scream/${screamId}`)
    .then(res => {
      dispatch({ type: SET_SCREAM, payload: res.data });
      dispatch({ type: TOGLE_LOADING_SCREAM });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: TOGLE_LOADING_SCREAM });
    });
};
export const closeScreamDialog = screamId => dispatch => {
  dispatch({ type: CLOSE_SCREAM_DIALOG });
};

export const addComment = newComment => dispatch => {
  dispatch({ type: TOGLE_LOADING_SCREAM });
  axios
    .post(`/scream/${newComment.screamId}/comment`, newComment)
    .then(res => {
      if (res.status !== 200) {
        console.error("Cannot submit the comment");
        throw new Error(res.data.error);
      }

      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data,
      });
      dispatch({ type: TOGLE_LOADING_SCREAM });
    })
    .catch(err => {
      console.error(err);
      dispatch({ type: TOGLE_LOADING_SCREAM });
    });
};
export const deleteComment = (screamId, commentId) => dispatch => {
  axios
    .delete(`/scream/${screamId}/comment/${commentId}`)
    .then(res => {
      if (res.status !== 200) {
        console.error("Cannot delete the comment");

        throw new Error(res.data.error);
      }

      dispatch({ type: DELETE_COMMENT, payload: { screamId, commentId } });
    })
    .catch(err => console.error(err));
};

import jwtDecode from "jwt-decode";
import store from "../redux/store";
import { SET_AUTHENTICATED } from "../redux/types";
import { logoutUser, getUserData } from "../redux/actions/userActions";

import axios from "axios";
export const checkAuthTokenValid = () => {
  const token = localStorage.getItem("FBIdToken");
  if (!token) return null;
  const decodedToken = jwtDecode(token);
  let timeToExpire = (decodedToken.exp * 1000 - new Date()) / 60000;
  if (timeToExpire <= 0) return false;
  else return true;
};

export default function checkAuth() {
  const token = localStorage.getItem("FBIdToken");
  if (token) {
    const decodedToken = jwtDecode(token);
    let timeToExpire = (decodedToken.exp * 1000 - new Date()) / 60000;
    if (timeToExpire < 0) {
      console.log(`token expired!`);

      store.dispatch(logoutUser());
      window.location.href = "/signin";
    } else {
      console.log(`token will expire in ${timeToExpire.toFixed(0)} min`);
      store.dispatch({ type: SET_AUTHENTICATED });
      axios.defaults.headers.common["Authorization"] = token;
      store.dispatch(getUserData());
    }
  }
}

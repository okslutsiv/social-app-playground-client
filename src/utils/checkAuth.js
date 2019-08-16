import jwtDecode from "jwt-decode";
import { useEffect } from "react";

import store from "../redux/store";
import { logoutUser } from "../redux/actions/userActions";

export default function useCheckAuth() {
  useEffect(() => {
    const token = localStorage.getItem("FBIdToken");
    let i = null;
    if (token) {
      const decodedToken = jwtDecode(token);
      const timeOfTokenExpire = decodedToken.exp;

      i = setInterval(() => {
        const timeLeft = timeOfTokenExpire * 1000 - new Date();

        if (timeLeft < 600000 && timeLeft > 60000) {
          console.log(
            `Token will expire in ${(timeLeft / 60000).toFixed(0)} min`,
          );
        } else if (timeLeft < 60000 ) {
          console.error(`Token expired!`);
          store.dispatch(logoutUser());
          window.location.href = "/signin";
        }
      }, 60000);
    }
    return () => clearInterval(i);
  });
}

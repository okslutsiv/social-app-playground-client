import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";

//Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { logoutUser, getUserData } from "./redux/actions/userActions";
import { SET_AUTHENTICATED } from "./redux/types";

//MUI
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import theme from "./MUIcustomization/theme";
import Box from "@material-ui/core/Box";

//pages
import Home from "./pages/home";
import User from "./pages/user";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import NotFound from "./pages/notFound";

//stuff
import AuthRoute from "./utils/AuthRoute";
import NavBar from "./components/navBar";
import Footer from "./components/footer";

axios.defaults.baseURL =
  "https://europe-west1-social-app-cc043.cloudfunctions.net/api/v1";

function App() {
  //start the app
  useEffect(() => {
    const token = localStorage.getItem("FBIdToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      const exp = decodedToken.exp * 1000;
      const timeToExpire = exp - new Date();
      if (timeToExpire > 5000) {
        console.log(
          `Token will expire in ${(timeToExpire / 60000).toFixed(0)} min`,
        );
        store.dispatch({ type: SET_AUTHENTICATED });
        axios.defaults.headers.common["Authorization"] = token;
        store.dispatch(getUserData());
      } else {
        console.log("Token expired!");
        store.dispatch(logoutUser());
        window.location.href = "/signin";
      }
    }
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <div>
          <BrowserRouter>
            <NavBar />
            <Box mt={10} className="App">
              <Switch>
                <AuthRoute path="/signin" component={SignIn} />
                <AuthRoute path="/signup" component={SignUp} />
                <Route
                  exact
                  path="/user/:userName/scream/:screamId"
                  component={User}
                />
                <Route exact path="/user/:userName" component={User} />
                <Route exact path="/" component={Home} />
                <Route path="*" component={NotFound} />
              </Switch>
            </Box>{" "}
            <Footer />
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;

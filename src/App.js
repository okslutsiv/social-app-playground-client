import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";

//Redux
import { Provider } from "react-redux";
import store from "./redux/store";
//MUI
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import theme from "./MUIcustomisation/theme";
import Box from "@material-ui/core/Box";

//pages
import Home from "./pages/home";
import User from "./pages/user";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
// import Scream from "./pages/scream";
import NotFound from "./pages/notFound";

//components
import AuthRoute from "./utils/AuthRoute";
import NavBar from "./components/navBar";
import checkAuth from "./utils/checkAuth";
import Footer from "./components/footer";

axios.defaults.baseURL =
  "https://europe-west1-social-app-cc043.cloudfunctions.net/api/v1";

checkAuth();

function App() {
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
                {/* <Route exact path="/scream/:screamId" component={Scream} /> */}
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

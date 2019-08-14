import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const AuthRoute = ({ authenticated, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authenticated ? <Redirect to="/" /> : <Component {...props} />
    }
  />
);

AuthRoute.propTypes = {
  authenticated: PropTypes.bool,
};
const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
});

export default connect(mapStateToProps)(AuthRoute);

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { validateSignUpData } from "../utils/validators";

//Redux
import { signupUser, clearAuthErors } from "../redux/actions/userActions";
import { connect } from "react-redux";

//MUI
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";

import makeStyles from "@material-ui/core/styles/makeStyles";

import monster6 from "../images/monster6.png";

const useStyles = makeStyles(theme => ({
  root: {},
  media: {
    height: 100,
    width: "auto",
  },
  error: {
    height: 48,
  },
  helper: theme.text.helper,
}));

const Signup = ({ auth, user, history, signupUser, clearAuthErors }) => {
  const classes = useStyles();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    userName: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    client: {
      email: "",
      password: "",
      userName: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    clearAuthErors();
  }, [clearAuthErors]);

  const handleSubmit = e => {
    e.preventDefault();
    const formData = validateSignUpData(credentials);
    if (!formData.valid) {
      setErrors({ client: formData.errors });
      return;
    }

    const newUserData = credentials;
    signupUser(newUserData, history);
  };

  const handleReset = () => {
    clearAuthErors();
    setCredentials({
      email: "",
      password: "",
      userName: "",
      confirmPassword: "",
    });
    setErrors({
      client: {
        email: "",
        password: "",
        userName: "",
        confirmPassword: "",
      },
    });
  };

  const handleChange = name => e => {
    setCredentials({ ...credentials, [name]: e.target.value });
    setErrors({ ...errors, client: { ...errors.client, [name]: "" } });
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h3" align="center" color="primary">
        Signup
      </Typography>
      <Grid container justify="center">
        <img src={monster6} alt="monster" className={classes.media} />
        <form onSubmit={handleSubmit}>
          <TextField
            name="userName"
            variant="outlined"
            label="Name"
            type="userName"
            fullWidth
            margin="normal"
            value={credentials.userName}
            onChange={handleChange("userName")}
            autoFocus
            required
            error={errors.client && errors.client.userName.length > 0}
            helperText={errors.client && errors.client.userName}
          />

          <TextField
            name="email"
            variant="outlined"
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={credentials.email}
            onChange={handleChange("email")}
            required
            error={errors.client && errors.client.email.length > 0}
            helperText={errors.client && errors.client.email}
          />
          <TextField
            name="password"
            variant="outlined"
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={credentials.password}
            onChange={handleChange("password")}
            required
            error={errors.client && errors.client.password.length > 0}
            helperText={errors.client && errors.client.password}
          />
          <TextField
            name="confirmPassword"
            variant="outlined"
            label="Confirm password"
            type="password"
            fullWidth
            margin="normal"
            value={credentials.confirmPassword}
            onChange={handleChange("confirmPassword")}
            required
            error={errors.client && errors.client.confirmPassword.length > 0}
            helperText={errors.client && errors.client.confirmPassword}
          />
          <div className={classes.error}>
            <Typography align="center" color="error">
              {auth.errors}
            </Typography>
          </div>
          <Box display="flex" justifyContent="space-between" my={2}>
            <Button color="primary" onClick={handleReset}>
              Reset
            </Button>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={auth.loadingAuth === true}
            >
              {auth.loadingAuth ? <CircularProgress size={24} /> : "Submit"}
            </Button>
          </Box>
          <Typography
            align="center"
            color="secondary"
            className={classes.helper}
            gutterBottom
          >
            Have an account?{" "}
            <Link to="/signin" style={{ color: "inherit" }}>
              Sign in here
            </Link>
          </Typography>
        </form>
      </Grid>
    </Container>
  );
};
Signup.propTypes = {
  user: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
  clearAuthErors: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  user: state.user,
  auth: state.auth,
});
const mapActionsToProps = {
  signupUser,
  clearAuthErors,
};
export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Signup);

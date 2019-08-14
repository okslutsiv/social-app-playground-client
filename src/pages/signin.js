import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { validateLoginData } from "../utils/validators";

// Redux
import { loginUser, clearAuthErors } from "../redux/actions/userActions";
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

import monsterImg from "../images/monster.png";

const useStyles = makeStyles(theme => ({
  media: {
    height: 100,
    width: "auto",
  },
  error: {
    height: 48,
  },
  helper: theme.text.helper,
}));

const Signin = ({ auth, user, loginUser, history, clearAuthErors }) => {
  const classes = useStyles();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  // const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    client: {
      email: "",
      password: "",
    },
  });
  useEffect(() => {
    clearAuthErors();
  }, [clearAuthErors]);

  const handleSubmit = e => {
    e.preventDefault();
    setErrors({
      client: {
        email: "",
        password: "",
      },
    });

    const formData = validateLoginData(credentials);
    console.log(formData.valid);
    if (!formData.valid) {
      setErrors({ client: formData.errors });
      return;
    }

    const userData = credentials;
    loginUser(userData, history);
  };

  const handleReset = () => {
    clearAuthErors();
    setCredentials({
      email: "",
      password: "",
    });
    // setLoading(false);
    setErrors({
      client: {
        email: "",
        password: "",
      },
    });
  };

  const handleChange = name => e => {
    setCredentials({
      ...credentials,
      [name]: e.target.value,
    });
    setErrors({ ...errors, client: { ...errors.client, [name]: "" } });
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h3" align="center" color="primary">
        Signin
      </Typography>
      <Grid container justify="center">
        <img src={monsterImg} alt="monster" className={classes.media} />
        <form onSubmit={handleSubmit}>
          <TextField
            name="email"
            variant="outlined"
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={credentials.email}
            onChange={handleChange("email")}
            autoFocus
            required
            error={errors.client.email.length > 0}
            helperText={errors.client.email}
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
            error={errors.client.password.length > 0}
            helperText={errors.client.password}
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
            Don't have an account?{" "}
            <Link to="/signup" style={{ color: "inherit" }}>
              Sign up here
            </Link>
          </Typography>
        </form>
      </Grid>
    </Container>
  );
};
Signin.propTypes = {
  user: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  user: state.user,
  auth: state.auth,
});

const mapActionsToProps = {
  loginUser,
  clearAuthErors,
};
export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Signin);

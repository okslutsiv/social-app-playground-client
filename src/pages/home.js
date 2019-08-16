/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import jwtDecode from "jwt-decode";

//Redux
import { connect } from "react-redux";
import { getScreams } from "../redux/actions/dataActions";
import { logoutUser } from "../redux/actions/userActions";

//MUI
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

import ScreamList from "../components/screams/screamList";
import ScreamSkeleton from "../utils/screamSkeleton";
import Profile from "../components/user/profile";
import useCheckAuth from "../utils/checkAuth";

const Home = ({ auth, data, user, getScreams }) => {
  useCheckAuth();
  // useEffect(() => {
  //   const token = localStorage.getItem("FBIdToken");
  //   let i = null;
  //   if (token) {
  //     const decodedToken = jwtDecode(token);
  //     const timeOfTokenExpire = decodedToken.exp;

  //     i = setInterval(() => {
  //       const timeLeft = timeOfTokenExpire * 1000 - new Date();

  //       if (timeLeft > 60000) {
  //         console.log(
  //           `Token will expire in ${(timeLeft / 60000).toFixed(0)} min`,
  //         );
  //       } else {
  //         console.log(`Token expired!`);
  //         logoutUser();
  //         window.location.href = "/signin";
  //       }
  //     }, 60000);
  //   }

  //   return () => clearInterval(i);
  // }, []);

  useEffect(() => {
    getScreams();
  }, []);

  const getScreamsMarkup = !data.loadingPage ? (
    <ScreamList screams={data.screams} />
  ) : (
    <ScreamSkeleton />
  );

  return (
    <Container maxWidth="md">
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Box>{getScreamsMarkup}</Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Profile profile={user.profile} loading={user.loadingUser} />
        </Grid>
      </Grid>
    </Container>
  );
};

Home.propTypes = {
  auth: PropTypes.object,
  data: PropTypes.object,
  user: PropTypes.object,
  getScreams: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  data: state.data,
  user: state.user,
  screamDialogId: state.screamDialog.screamDialogId,
});
const mapActionsToProps = {
  getScreams,
  logoutUser,
};
export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Home);

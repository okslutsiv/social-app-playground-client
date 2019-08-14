/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
//Redux
import { connect } from "react-redux";
import { getScreams } from "../redux/actions/dataActions";
//MUI
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

import ScreamList from "../components/screams/screamList";
import ScreamSkeleton from "../utils/screamSkeleton";
import Profile from "../components/user/profile";

const Home = ({ auth, data, user, getScreams }) => {
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
};

const mapStateToProps = state => ({
  auth: state.auth,
  data: state.data,
  user: state.user,
  screamDialogId: state.screamDialog.screamDialogId,
});
const mapActionsToProps = {
  getScreams,
};
export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Home);

import React, { useEffect } from "react";
import PropTypes from "prop-types";
//Redux
import { connect } from "react-redux";
import { getUserpageData } from "../redux/actions/dataActions";
import { openScreamDialog } from "../redux/actions/screamDialogActions";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

//stuff
import ScreamList from "../components/screams/screamList";
import ScreamDialog from "../components/screams/screamDialog";
import ScreamSkeleton from "../utils/screamSkeleton";
import Profile from "../components/user/profile";
import useCheckAuth from "../utils/checkAuth";

const User = props => {
  // props from react-router-dom
  const userName = props.match.params.userName;
  const screamId = props.match.params.screamId;

  //props from redux
  const { data, getUserpageData, openScreamDialog, screamDialogId } = props;

  useCheckAuth();

  useEffect(() => {
    screamId && openScreamDialog(screamId);
  }, [screamId]);

  useEffect(() => {
    getUserpageData(userName);
  }, [userName]);

  const getScreamsMarkup = !data.loadingPage ? (
    <ScreamList screams={data.screams} />
  ) : (
    <ScreamSkeleton />
  );

  return (
    <>
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Profile profile={data.author} loading={data.loadingPage} />
          </Grid>
          <Grid item xs={12} md={8}>
            <Box>{getScreamsMarkup}</Box>
          </Grid>
        </Grid>
      </Container>
      <ScreamDialog
        urlScreamId={screamId || ""}
        urlUserName={userName || ""}
        openedFromAddressBar
        dontShowButton
        screamDialogId={screamDialogId}
        location={props.location}
      />
    </>
  );
};

User.propTypes = {
  profile: PropTypes.object,
  screams: PropTypes.array,
  user: PropTypes.object,
  loading: PropTypes.bool,
  dialogOpen: PropTypes.bool,
  getUserpageData: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  data: state.data,
  screamDialog: state.screamDialog,
  screamDialogId: state.screamDialog.screamDialogId,
});
export default connect(
  mapStateToProps,
  { getUserpageData, openScreamDialog },
)(User);

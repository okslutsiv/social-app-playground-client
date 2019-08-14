//====
// Profile card is used to display authorized user's data on the Home page as well as author's on the User page
//The authorized user's profile has options of logout, editing the profile image and profile details
// It takes a profile object and loading as props from a parent component
//====

import React from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

//Redux
import { connect } from "react-redux";
import { uploadImage, logoutUser } from "../../redux/actions/userActions";

//MUI
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import useTheme from "@material-ui/core/styles/useTheme";
import makeStyles from "@material-ui/core/styles/makeStyles";

import {
  CalendarIcon,
  MarkerIcon,
  LinkIcon,
  CameraIcon,
  LogoutIcon,
} from "../icons";
import EditUserDetails from "./editUserDetails";
import ProfileSkeleton from "../../utils/profileSkeleton";
import monster4 from "../../images/monster4.png";

const useStyles = makeStyles(theme => ({
  media: {
    width: 100,
    height: 100,
    ...theme.avatar,
  },
  icon: {
    color: theme.palette.primary.main,
    width: 20,
    height: 20,
    marginRight: 16,
  },
  userImg: {
    position: "relative",
  },
  iconBtn: {
    position: "absolute",
    bottom: 0,
    right: -20,
  },
  monster: {
    height: 120,
    display: "block",
    maxWidth: "100%",
  },
}));

const Profile = props => {
  const classes = useStyles();
  const theme = useTheme();

  //props from parent
  const {
    loading,
    profile: { userName, bio, imageUrl, createdAt, location, website },
  } = props;

  //props from redux
  const { auth, user, uploadImage } = props;

  const handleImageChange = e => {
    const image = e.target.files[0];
    const formData = new FormData();
    if (image) {
      formData.append("image", image, image.name);
      uploadImage(formData);
    } else {
      console.log("Nothing to upload");
    }
  };

  const handleImageUploadIconClick = () => {
    const imageInput = document.getElementById("imageInput");
    imageInput.click();
  };

  const handleLogout = () => {
    props.logoutUser();
  };

  const showBottomActions = () => (
    <>
      {auth.authenticated && user.profile.userName === userName ? (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={1}
          borderTop={`1px solid ${theme.palette.secondary.light}`}
          p={2}
        >
          <EditUserDetails profile={{ bio, location, website }} />
          <Tooltip title="Log out" placement="top">
            <Button color="secondary" onClick={handleLogout}>
              <LogoutIcon />
            </Button>
          </Tooltip>
        </Box>
      ) : null}
    </>
  );

  const showImageUploadAction = () => (
    <>
      {auth.authenticated && user.profile.userName === userName ? (
        <>
          <input
            onChange={handleImageChange}
            type="file"
            id="imageInput"
            hidden
          />
          <Tooltip title="Upload another image">
            <IconButton
              color="secondary"
              size="small"
              onClick={handleImageUploadIconClick}
              className={classes.iconBtn}
            >
              <CameraIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : null}
    </>
  );

  const userData = () => (
    <>
      <Box position="relative" my={2}>
        <img src={imageUrl} alt="avatar" className={classes.media} />
        {showImageUploadAction()}
      </Box>
      <MuiLink
        variant="h6"
        gutterBottom
        color="primary"
        component={Link}
        to={`/user/${userName}`}
      >
        @{userName}
      </MuiLink>
      {bio && (
        <Typography variant="body1" gutterBottom color="textSecondary">
          {bio}
        </Typography>
      )}
      <Box display="flex" flexDirection="column" alignItems="flex-start">
        {location && (
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            my={1}
          >
            <MarkerIcon className={classes.icon} />
            <Typography variant="body1" color="textSecondary">
              {location}
            </Typography>
          </Box>
        )}{" "}
        {website && (
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            my={1}
          >
            <LinkIcon className={classes.icon} />
            <MuiLink variant="body1" color="textSecondary" href={website}>
              {website}
            </MuiLink>
          </Box>
        )}
        <Box
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          my={1}
        >
          <CalendarIcon className={classes.icon} />
          <Typography variant="body1" color="textSecondary">
            joined in {dayjs(createdAt).format("MMM YYYY")}
          </Typography>
        </Box>
      </Box>
    </>
  );

  const noUser = () => (
    <>
      <Box mt={2} display="flex" justifyContent="center" width="100%">
        <img src={monster4} alt="monster" className={classes.monster} />

        <Typography>No data to display.</Typography>
      </Box>
      <Box mt={5} display="flex" justifyContent="space-between" width="100%">
        <Button
          component={Link}
          to="/signup"
          variant="contained"
          color="secondary"
        >
          Sign up
        </Button>{" "}
        <Button
          component={Link}
          to="/signin"
          variant="contained"
          color="primary"
        >
          Log in
        </Button>
      </Box>
    </>
  );

  return (
    <Paper>
      <Box display="flex" flexDirection="column" alignItems="center" p={2}>
        {auth.authenticated ? (
          loading ? (
            <ProfileSkeleton />
          ) : props.profile.userName ? (
            userData()
          ) : (
            <Box>
              <Typography color="primary">Ooops...User not found</Typography>
              <ProfileSkeleton />
            </Box>
          )
        ) : (
          noUser()
        )}
      </Box>
      {showBottomActions()}
    </Paper>
  );
};

Profile.propTypes = {
  profile: PropTypes.object,
  user: PropTypes.object,
  auth: PropTypes.object,
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  user: state.user,
  auth: state.auth,
});
const mapActionsToProps = {
  uploadImage,
  logoutUser,
};
export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Profile);

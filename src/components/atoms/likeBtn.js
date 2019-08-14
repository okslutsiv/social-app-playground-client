import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
//Redux
import { connect } from "react-redux";
import { likeScream, unlikeScream } from "../../redux/actions/dataActions";
//MUI
import makeStyles from "@material-ui/core/styles/makeStyles";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
//stuff
import { LikeFilledIcon, LikeOutlinedIcon } from "../icons";

const useStyles = makeStyles({
  like: {
    padding: 3,
  },
});

function LikeBtn(props) {
  // props from parent
  const { screamId, color } = props;
  // props from redux
  const { authenticated, user, likeScream, unlikeScream } = props;
  const classes = useStyles();

  const handleLike = () => {
    likeScream(screamId);
  };

  const handleUnlike = () => {
    unlikeScream(screamId);
  };

  const checkIfScreamIsLiked = () => {
    if (user.likes && user.likes.some(like => like.screamId === screamId)) {
      return true;
    } else {
      return false;
    }
  };
  const likedScream = checkIfScreamIsLiked();

  return !authenticated ? (
    <Link to="/signin">
      <Tooltip title="Like">
        <IconButton
          onClick={handleLike}
          color={props.color}
          size="small"
          className={classes.like}
        >
          <LikeOutlinedIcon />
        </IconButton>
      </Tooltip>
    </Link>
  ) : likedScream ? (
    <Tooltip title="Undo like">
      <IconButton
        onClick={handleUnlike}
        color={props.color}
        size="small"
        className={classes.like}
      >
        <LikeFilledIcon />
      </IconButton>
    </Tooltip>
  ) : (
    <Tooltip title="Like">
      <IconButton
        onClick={handleLike}
        color={color}
        size="small"
        className={classes.like}
      >
        <LikeOutlinedIcon />
      </IconButton>
    </Tooltip>
  );
}

LikeBtn.propTypes = {
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
  user: PropTypes.object,
  screamId: PropTypes.string.isRequired,
  color: PropTypes.string,
};

LikeBtn.defaultProps = {
  color: "primary",
};
const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
  user: state.user,
});

const mapActionsToProps = {
  likeScream,
  unlikeScream,
};
export default connect(
  mapStateToProps,
  mapActionsToProps,
)(LikeBtn);

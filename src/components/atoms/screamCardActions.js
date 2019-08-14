import React from "react";
import PropTypes from "prop-types";

// MUI
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import useTheme from "@material-ui/core/styles/useTheme";

//stuff
import LikeBtn from "../atoms/likeBtn";
// import { ChatIcon } from "../icons";

const useStyles = makeStyles(theme => ({
  chatIcon: { marginRight: 4 },
  small: theme.text.small,
}));
const Actions = ({
  screamId,
  likesCount,
  commentsCount,
  className: classNameProps,
  color,
}) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Box
      className={`${classNameProps}`}
      display="flex"
      alignItems="center"
      mx={2}
    >
      <LikeBtn screamId={screamId} color={color} />
      <Typography component="span" className={classes.small} color={color}>
        liked by {likesCount}
      </Typography>
      <Box
        display="inline-flex"
        style={{ color: theme.palette[color].main }}
        alignItems="center"
        marginLeft="auto"
      >
        {/* <ChatIcon className={classes.chatIcon} /> */}
        <Typography component="span" className={classes.small}>
          {commentsCount} {commentsCount === 1 ? "comment" : "comments"}
        </Typography>
      </Box>
    </Box>
  );
};
Actions.propTypes = {
  screamId: PropTypes.string.isRequired,
  likesCount: PropTypes.number,
  commentsCount: PropTypes.number,
};
Actions.defaultProps = {
  color: "primary",
  className: {},
  likesCount: 0,
  commentsCount: 0,
};
export default Actions;

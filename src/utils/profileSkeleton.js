import React from "react";
import noAvatar from "../images/no-avatar.png";

//MUI
import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
  root: {
    width: "90%",
    margin: "0 auto",
  },
  media: {
    width: 100,
    height: 100,
    ...theme.avatar,
    margin: "16px auto",
    display: "block",
  },
  field90: {
    backgroundColor: `${theme.palette.secondary.main}10`,
    width: "90%",
    height: 14,
    margin: "16px auto",
  },
  field50: {
    backgroundColor: `${theme.palette.secondary.main}10`,
    width: "50%",
    height: 14,
    margin: "16px auto",
  },
  field70: {
    backgroundColor: `${theme.palette.secondary.main}20`,
    width: "50%",
    height: 44,
    margin: "16px auto",
  },
}));

function ProfileSkeleton(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box my={2}>
        <img src={noAvatar} alt="avatar" className={classes.media} />
      </Box>
      <Box px={2}>
        <div className={classes.field90} />
        <div className={classes.field50} />
        <div className={classes.field50} />
        <div className={classes.field70} />
      </Box>
    </div>
  );
}

export default ProfileSkeleton;

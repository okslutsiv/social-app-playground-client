import React from "react";

// MUI
import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
  scream: {
    marginBottom: 24,
    width: "100%",
    display: "grid",
    gridTemplateColumns: "10rem auto 20%",
    gridTemplateRows: "3rem 2rem auto 3rem",
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "5rem 5rem 2rem",
      gridTemplateRows: "3rem 2rem auto 3rem",
    },
  },
  mediaContainer: {
    gridColumn: "1/2",
    gridRow: "1/5",
    justifySelf: "center",
  },
  media: {
    width: 120,
    height: 120,
    marginTop: 20,
    borderRadius: "50%",
    boxShadow: theme.shadows[4],
    border: `2px solid ${theme.palette.secondary.main}40`,
    backgroundColor: `${theme.palette.secondary.main}40`,
    [theme.breakpoints.down("sm")]: {
      width: 50,
      height: 50,
    },
  },
  body: {
    gridColumn: "2/3",
    gridRow: "2/4",
    minHeight: "2rem",
    [theme.breakpoints.down("xs")]: {
      gridColumn: "1/3",
    },
    backgroundColor: `${theme.palette.secondary.main}10`,
  },
}));

const DialogSkeleton = () => {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.scream}>
        <div className={classes.mediaContainer}>
          <div className={classes.media} />
        </div>
        <div className={classes.body} />
      </Box>
    </>
  );
};

export default DialogSkeleton;

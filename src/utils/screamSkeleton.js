import React from "react";
import noAvatar from "../images/no-avatar.png";

// MUI
import Card from "@material-ui/core/Card";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "grid",
    gridTemplateColumns: "10rem auto 30%",
    gridTemplateRows: "1rem 0.8rem 3rem 1.5rem",
    marginBottom: 24,
    width: "100%",
    gridGap: 5,
    boxShadow: "none",
    padding: 8,
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "5rem auto 2rem",
    },
  },
  user: {
    gridColumn: "2/3",
    gridRow: "1/2",
    alignSelf: "center",
    height: 14,
    backgroundColor: `${theme.palette.secondary.main}10`,
  },
  media: {
    gridColumn: "1/2",
    gridRow: "1/5",
    justifySelf: "center",
    alignSelf: "start",
    width: 100,
    height: 100,
    ...theme.avatar,
    [theme.breakpoints.down("sm")]: {
      width: 50,
      height: 50,
    },
  },
  date: {
    gridColumn: "2/3",
    gridRow: "2/3",
    backgroundColor: `${theme.palette.secondary.main}10`,
    height: 12,
  },
  body: {
    gridColumn: "2/4",
    gridRow: "3/4",
    backgroundColor: `${theme.palette.secondary.main}20`,
    height: 36,
  },
  actions: {
    gridColumn: "2/3",
    gridRow: "4/5",
    backgroundColor: `${theme.palette.secondary.main}10`,
  },
}));
const ScreamSkeleton = props => {
  const classes = useStyles();
  return (
    <div style={{ margin: "0 16px" }}>
      {Array.from({ length: 5 }).map((v, i) => (
        <Card className={classes.root} key={i}>
          <img src={noAvatar} className={classes.media} alt="" />
          <div className={classes.user} />
          <div className={classes.date} />

          <div className={classes.body} />

          <div className={classes.actions} />
        </Card>
      ))}
    </div>
  );
};

export default ScreamSkeleton;

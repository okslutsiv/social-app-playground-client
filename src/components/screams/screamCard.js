//====
//screamCard displays scream in a list of screams : either on the Home page, or User page
//kind of data is the same, but on the Home page it sources from the global state , on the User page - from the local
//is a parent for single scream dialog
//====
import React from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// MUI
import Card from "@material-ui/core/Card";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/core/styles/makeStyles";

//Redux
import { connect } from "react-redux";

//stuff
import DeleteScream from "../atoms/deleteScream";
import ScreamDialog from "./screamDialog";
import ScreamCardActions from "../atoms/screamCardActions";

const useStyles = makeStyles(theme => ({
  root: {
    display: "grid",
    gridTemplateColumns: "10rem auto 2rem",
    gridTemplateRows: "2.5rem 1rem auto 2rem",
    marginBottom: 24,
    // border: `10px solid fff`,
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "5rem auto 2rem",
    },
  },
  user: {
    gridColumn: "2/3",
    gridRow: "1/2",
    alignSelf: "center",
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
      width: 48,
      height: 48,
    },
  },
  date: {
    gridColumn: "2/3",
    gridRow: "2/3",
  },
  body: {
    gridColumn: "2/3",
    gridRow: "3/4",
    [theme.breakpoints.down("xs")]: {
      gridColumn: "1/3",
      paddingLeft: 18,
    },
  },
  actions: {
    gridColumn: "2/3",
    gridRow: "4/5",
    color: theme.palette.primary.main,
    [theme.breakpoints.down("xs")]: {
      gridColumn: "1/3",
      paddingLeft: 18,
    },
  },
  small: {
    fontSize: 12,
  },
  delete: {
    gridColumn: "3/4",
    gridRow: "1/2",
  },
  expand: {
    gridColumn: "3/4",
    gridRow: "4/5",
  },
}));
const ScreamCard = props => {
  //props from parent
  const { scream } = props;
  //props from redux
  const { user } = props;
  const classes = useStyles();
  dayjs.extend(relativeTime);

  return (
    <Card className={classes.root}>
      <img
        src={scream.imageUrl}
        className={classes.media}
        alt={scream.userName}
      />
      <div className={classes.user}>
        <Link
          variant="h5"
          color="primary"
          to={`/user/${scream.userName}`}
          component={RouterLink}
          underline="none"
        >
          @{scream.userName}
        </Link>
      </div>
      <div className={classes.date}>
        <Typography
          variant="body2"
          color="textSecondary"
          className={classes.small}
        >
          {dayjs().to(dayjs(scream.createdAt))}
        </Typography>
      </div>
      <Box className={classes.body}>
        <Typography variant="body1" color="textPrimary">
          {scream.body}
        </Typography>
      </Box>
      <ScreamCardActions
        color="secondary"
        screamId={scream.screamId}
        likesCount={scream.likesCount}
        commentsCount={scream.commentsCount}
        className={classes.actions}
      />
      <div className={classes.delete}>
        {scream.userName === user.profile.userName ? (
          <DeleteScream screamId={scream.screamId} />
        ) : null}
      </div>
      <div className={classes.expand}>
        <ScreamDialog
          urlScreamId={scream.screamId}
          urlUserName={scream.userName}
        />
      </div>
    </Card>
  );
};

ScreamCard.propTypes = {
  user: PropTypes.object,
  scream: PropTypes.object,
  index: PropTypes.number,
};

const mapStateToProps = state => ({
  user: state.user,
  // screams: state.data.screams,
});
export default connect(mapStateToProps)(ScreamCard);

//====
// ScreamDialog exposes all scream content
// It may be called both from the ScreamCard and from the address bar
// Parent props: screamId & userName
// If no scream recieved, it wil render the NotFound component
//====

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// MUI
import Dialog from "@material-ui/core/Dialog";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";

import makeStyles from "@material-ui/core/styles/makeStyles";
//Redux
import { connect } from "react-redux";
import {
  openScreamDialog,
  closeScreamDialog,
  getScreamData,
} from "../../redux/actions/screamDialogActions";
//stuff
import ScreamCardActions from "../atoms/screamCardActions";
import NotFound from "../../pages/notFound";
import { CloseIcon, ReadIcon } from "../icons";
import Comments from "./comments";
import AddComment from "../atoms/addComment";
import DialogSkeleton from "../../utils/dialogSkeleton";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  scream: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "10rem auto 3rem",
    gridTemplateRows: "3rem 2rem auto 3rem",
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "5rem auto 2rem",
      gridTemplateRows: "3rem 2rem auto 3rem",
    },
  },
  mediaContainer: {
    gridColumn: "1/2",
    gridRow: "1/5",
    justifySelf: "center",
  },
  media: {
    ...theme.avatar,
    width: 120,
    height: 120,
    marginTop: 20,
    boxShadow: theme.shadows[4],
    border: `2px solid ${theme.palette.secondary.main}40`,
    backgroundColor: `${theme.palette.secondary.main}40`,
    [theme.breakpoints.down("sm")]: {
      width: 50,
      height: 50,
    },
  },
  user: {
    gridColumn: "2/3",
    gridRow: "1/2",
    alignSelf: "end",
  },
  date: {
    gridColumn: "2/3",
    gridRow: "2/3",
  },
  body: {
    gridColumn: "2/4",
    gridRow: "3/4",
    minHeight: "3rem",
    [theme.breakpoints.down("xs")]: {
      gridColumn: "1/3",
      paddingLeft: 18,
    },
  },
  actions: {
    gridColumn: "2/3",
    gridRow: "4/5",
    alignSelf: "center",
    color: theme.palette.secondary.main,
    fontSize: 12,
    [theme.breakpoints.down("xs")]: {
      gridColumn: "1/4",
      paddingLeft: 18,
    },
  },
  collapse: {
    gridColumn: "3/4",
    gridRow: "1/2",
    justifySelf: "center",
    alignSelf: "center",
  },
  deleteBtn: {
    gridColumn: "3/4",
    gridRow: "4/5",
    justifySelf: "center",
    alignSelf: "center",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  comments: {
    marginLeft: 60,
    padding: "8px 24px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
      padding: 8,
    },
  },
}));

const ScreamDialog = props => {
  // props from parent
  const { urlScreamId, urlUserName, openedFromAddressBar } = props;
  //props from redux
  const {
    authenticated,
    scream,
    loadingScream,
    screamDialogId,
    openScreamDialog,
    closeScreamDialog,
    getScreamData,
  } = props;

  const classes = useStyles();
  dayjs.extend(relativeTime);
  const [open, setOpen] = useState(false);

  const [oldPath, setOldPath] = useState("");
  const [newPath, setNewPath] = useState("");

  const handleOpenWithButton = () => {
    openScreamDialog(urlScreamId);
  };
  const updateHistoryObj = () => {
    //give a scream a unique path
    const newP = `/user/${urlUserName}/scream/${urlScreamId}`;

    //if the componet was called from a scream card set it's old path to location pathname
    let oldP = window.location.pathname;

    //if component was called from the address bar or notificatons, set its old path to the author's page
    if (oldP.includes("/scream/")) oldP = `/user/${urlUserName}`;

    setNewPath(newP);
    setOldPath(oldP);
    window.history.pushState(null, null, newP);
  };

  useEffect(() => {
    const validId = screamDialogId === urlScreamId;
    validId && updateHistoryObj();
    validId && getScreamData(screamDialogId);
    setOpen(validId);
  }, [screamDialogId]);

  const handleClose = history => {
    console.log("closing dialog");
    console.log(newPath, oldPath);

    window.history.pushState(null, null, oldPath);
    setOldPath(``);
    setNewPath("");
    closeScreamDialog();
  };

  const screamMarkup = (
    <>
      {loadingScream ? (
        <DialogSkeleton />
      ) : (
        <>
          <Box className={classes.scream}>
            <div className={classes.mediaContainer}>
              <img
                src={scream.imageUrl}
                className={classes.media}
                alt={scream.userName}
              />
            </div>
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
              <Typography variant="body2" color="textSecondary">
                {dayjs().to(dayjs(scream.createdAt))}
              </Typography>
            </div>
            <div className={classes.body}>
              <Typography variant="body1" color="textPrimary">
                {scream.body}
              </Typography>
            </div>
            <ScreamCardActions
              color="secondary"
              screamId={urlScreamId}
              likesCount={scream.likesCount}
              commentsCount={scream.commentsCount}
              className={classes.actions}
            />
            <div className={classes.collapse}>
              <Tooltip title="Close scream">
                <IconButton onClick={handleClose} color="primary" size="small">
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </div>
          </Box>
        </>
      )}
    </>
  );
  return (
    <>
      {!openedFromAddressBar && (
        <Tooltip title="Read the scream">
          <IconButton
            size="small"
            color="secondary"
            onClick={handleOpenWithButton}
          >
            <ReadIcon />
          </IconButton>
        </Tooltip>
      )}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        {scream.screamId === null ? (
          <NotFound />
        ) : (
          <>
            <Box className={classes.root}>{screamMarkup}</Box>
            <Divider />
            {authenticated ? (
              <AddComment screamId={screamDialogId && screamDialogId} />
            ) : null}
            <Box className={classes.comments}>
              {loadingScream ? (
                <Box>
                  <CircularProgress size={24} />
                </Box>
              ) : scream.comments && scream.comments.length > 0 ? (
                <Comments comments={scream.comments} />
              ) : (
                <Typography variant="body1" color="textPrimary">
                  No comments yet
                </Typography>
              )}{" "}
            </Box>
          </>
        )}
      </Dialog>
    </>
  );
};

ScreamDialog.propTypes = {
  user: PropTypes.object,
  openScreamDialog: PropTypes.func.isRequired,
  closeScreamDialog: PropTypes.func.isRequired,
  scream: PropTypes.object,
  loadingScream: PropTypes.bool,
  screamDetails: PropTypes.object,
  urlScreamId: PropTypes.string.isRequired,
  urlUserName: PropTypes.string.isRequired,
  auth: PropTypes.object,
  openedFromAddressBar: PropTypes.bool,
};

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
  user: state.user,
  scream: state.screamDialog.scream,
  loadingScream: state.screamDialog.loadingScream,
  screamDialogId: state.screamDialog.screamDialogId,
});
const mapActionsToProps = {
  openScreamDialog,
  closeScreamDialog,
  getScreamData,
};
export default connect(
  mapStateToProps,
  mapActionsToProps,
)(ScreamDialog);

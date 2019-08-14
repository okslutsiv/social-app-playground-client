//==========
// Modal with form for adding new scream
// visible for authenticated users
//==========

import React, { useState } from "react";
import PropTypes from "prop-types";
//Redux
import { connect } from "react-redux";
import { addScream } from "../../redux/actions/dataActions";

//MUI
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

import makeStyles from "@material-ui/core/styles/makeStyles";

import { AddIcon, CloseIcon } from "../icons";

const useStyles = makeStyles(theme => ({
  collapse: {
    display: "inline-block",
    margin: "0 8px 0 auto",
  },
  title: {
    color: theme.palette.primary.main,
  },
}));

const AddScream = ({ authenticated, user, loading, addScream }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [newScream, setNewScream] = useState({ body: "" });
  const [error, setError] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    newScream.body.length === 0 && setError("Nothing to submit");
    addScream(newScream);
    setError("");
    handleClose();
  };
  const handleChange = e => {
    setNewScream({ body: e.target.value });
  };
  const handleClose = () => {
    setOpen(false);
    setNewScream("");
    setError("");
  };

  return (
    <>
      {authenticated ? (
        <Tooltip title="Add a new scream">
          <Button onClick={() => setOpen(true)} color="inherit">
            <AddIcon />
          </Button>
        </Tooltip>
      ) : null}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <DialogTitle className={classes.title}>
            <AddIcon /> Add a new scream{" "}
          </DialogTitle>
          <span className={classes.collapse}>
            <Tooltip title="Close the window">
              <IconButton onClick={handleClose} color="secondary" size="small">
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </span>
        </Box>
        {loading ? (
          <CircularProgress size={48} />
        ) : (
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <TextField
                autoFocus
                value={newScream.body}
                variant="outlined"
                name="newScream"
                onChange={handleChange}
                margin="dense"
                id="newScream"
                multiline
                rows={3}
                label="Scream here"
                type="textarea"
                fullWidth
                required
                error={error.length > 0}
                helperText={error}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button
                type="submit"
                color="primary"
                disabled={newScream.length === 0}
                variant="contained"
              >
                Scream
              </Button>
            </DialogActions>
          </form>
        )}
      </Dialog>
    </>
  );
};

AddScream.propTypes = {
  user: PropTypes.object,
  authenticated: PropTypes.bool.isRequired,
  addScream: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};
const mapActionsToProps = {
  addScream,
};

const mapStateToProps = state => ({
  user: state.user,
  authenticated: state.auth.authenticated,
  loading: state.data.loadingPage,
});

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(AddScream);

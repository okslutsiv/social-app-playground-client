//=======
// a Modal component can be seen only by authenticated users
//=======

import React, { useState } from "react";
import PropTypes from "prop-types";
//Redux
import { connect } from "react-redux";
import { deleteScream } from "../../redux/actions/dataActions";
//MUI
import makeStyles from "@material-ui/core/styles/makeStyles";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import DialogContentText from "@material-ui/core/DialogContentText";
//stuff
import { DeleteIcon } from "../icons";

const useStyles = makeStyles(theme => ({
  btn: {
    padding: 3,
    marginLeft: "auto",
    opacity: 0.8,
  },
  dialogTitle: {
    color: theme.palette.error.main,
  },
  deleteBtn: {
    backgroundColor: theme.palette.error.main,
    color: "#fff",
    margin: "0px 12px",
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },
  paper: {
    alignItems: "center",
    justifyContent: "center",
  },
}));

function DeleteScream(props) {
  //props from parent
  const { screamId } = props;

  //props from redux
  const { authenticated, deleteScream } = props;

  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleDelete = () => {
    deleteScream(screamId);
    setOpen(false);
  };

  return (
    <>
      {authenticated ? (
        <Tooltip title="Delete scream">
          <IconButton
            onClick={handleOpen}
            color="secondary"
            size="small"
            className={classes.btn}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : null}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle color="error" className={classes.dialogTitle}>
          You are going to delete the scream.
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure? Confirm the action, please
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            className={classes.deleteBtn}
            onClick={handleDelete}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

DeleteScream.propTypes = {
  deleteScream: PropTypes.func.isRequired,
  authenticated: PropTypes.bool,
  screamId: PropTypes.string.isRequired,
};
const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
});

const mapActionsToProps = {
  deleteScream,
};
export default connect(
  mapStateToProps,
  mapActionsToProps,
)(DeleteScream);

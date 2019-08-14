//=======
//  Can be visible in ScreamDialog component only for authenticated users
//=======
import React from "react";
import PropTypes from "prop-types";
//Redux
import { connect } from "react-redux";
import { deleteComment } from "../../redux/actions/screamDialogActions";
//MUI
import makeStyles from "@material-ui/core/styles/makeStyles";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

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
}));

function DeleteComment(props) {
  //props from parent
  const { commentId, screamId } = props;
  //props from redux
  const { authenticated, deleteComment } = props;

  const classes = useStyles();

  const handleDelete = () => {
    deleteComment(screamId, commentId);
  };

  return (
    <>
      {authenticated ? (
        <Tooltip title="Delete comment">
          <IconButton
            onClick={handleDelete}
            color="secondary"
            size="small"
            className={classes.btn}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : null}
    </>
  );
}

DeleteComment.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  authenticated: PropTypes.bool,
  screamId: PropTypes.string.isRequired,
  commentId: PropTypes.string.isRequired,
};
const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
});

const mapActionsToProps = {
  deleteComment,
};
export default connect(
  mapStateToProps,
  mapActionsToProps,
)(DeleteComment);

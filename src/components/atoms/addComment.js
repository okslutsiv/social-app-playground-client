import React, { useState } from "react";
import PropTypes from "prop-types";

//MUI
import makeStyles from "@material-ui/core/styles/makeStyles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

//Redux
import { connect } from "react-redux";
import { addComment } from "../../redux/actions/screamDialogActions";

const useStyles = makeStyles(theme => ({
  root: {},
  actions: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const AddComment = props => {
  //parent props
  const { screamId } = props;

  //redux props
  const { user, addComment, screamDialog } = props;
  const classes = useStyles();
  const [newCommentText, setNewComment] = useState("");
  const [error, setError] = useState("");

  const handleChange = e => {
    setNewComment(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const newComment = {
      screamId,
      body: newCommentText,
      userName: user.profile.userName,
      imageUrl: user.profile.imageUrl,
      createdAt: new Date().toISOString(),
    };

    addComment(newComment);
    ClearState();
  };
  const ClearState = () => {
    setNewComment("");
    setError("");
  };

  return (
    <Box p={3}>
      <form onSubmit={handleSubmit} className={classes.root}>
        <TextField
          autoFocus
          value={newCommentText}
          variant="outlined"
          name="newComment"
          onChange={handleChange}
          margin="dense"
          id="newComment"
          multiline
          rows={2}
          label="Comment here"
          type="textarea"
          fullWidth
          required
          error={error.length > 0}
          helperText={error}
        />
        <div className={classes.actions}>
          <Button onClick={ClearState} color="primary" size="small">
            Cancel
          </Button>
          <Button
            type="submit"
            color="primary"
            disabled={newCommentText.length === 0}
            variant="contained"
            size="small"
          >
            {screamDialog.loadingScream ? (
              <CircularProgress size={24} />
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </form>
    </Box>
  );
};

AddComment.propTypes = {
  addComment: PropTypes.func.isRequired,
  screamId: PropTypes.string,
  user: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  user: state.user,
  screamDialog: state.screamDialog,
});

export default connect(
  mapStateToProps,
  { addComment },
)(AddComment);

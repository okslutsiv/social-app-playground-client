//======
// a ScreamDialog component that displays a list of comments
// the author of the comment can see the delete button
//=====

import React from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import dayjs from "dayjs";

//MUI
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Link from "@material-ui/core/Link";

//Redux
import { connect } from "react-redux";

//stuff
import DeleteComment from "../atoms/deleteComment";

const useStyles = makeStyles(theme => ({
  comment: {
    display: "grid",
    gridTemplateColumns: "50px auto 40px",
    gridTemplateRows: "auto 1rem",
    marginTop: 8,
    padding: 8,
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "50px auto 20px",
      padding: "8px 0",
    },
  },
  body: {
    gridColumn: "2/3",
    gridRow: "1/2",
    backgroundColor: `${theme.palette.secondary.main}40`,
    borderRadius: theme.shape.borderRadius,
    padding: 8,
  },
  userName: {
    fontStyle: "bold",
    marginRight: 8,
  },
  date: {
    gridRow: "2/3",
    gridColumn: "2/3",
    fontSize: 10,
  },
  avatar: {
    gridRow: "1/3",
    gridColumn: "1/2",
    border: `2px solid ${theme.palette.secondary.main}20`,
    boxShadow: theme.shadows[0],
  },
  actions: {
    gridRow: "1/2",
    gridColumn: "3/4",
    fontSize: 10,
    color: theme.palette.error.main,
  },
}));
const Comments = props => {
  //parent props
  const { comments } = props;
  //redux props
  const { user } = props;

  const classes = useStyles();

  return comments.map((comment, index) => (
    <div className={classes.comment} key={String(comment.createdAt) + index}>
      <Avatar src={comment.imageUrl} className={classes.avatar} />

      <Typography className={classes.date} color="textSecondary">
        {dayjs().to(comment.createdAt)}{" "}
      </Typography>

      <Typography className={classes.body} color="textPrimary">
        <Link
          component={RouterLink}
          to={`/user/${comment.userName}`}
          color="primary"
          variant="body1"
          underline="none"
          className={classes.userName}
        >
          @{comment.userName}
        </Link>{" "}
        {comment.body}
      </Typography>
      <div className={classes.actions}>
        {comment.userName === user.profile.userName ? (
          <DeleteComment
            screamId={comment.screamId}
            commentId={comment.commentId}
          />
        ) : null}
      </div>
    </div>
  ));
};
Comments.propTypes = {
  comments: PropTypes.array,
  user: PropTypes.object,
  screams: PropTypes.array,
};
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Comments);

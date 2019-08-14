import React from "react";
import PropTypes from "prop-types";
// import { Redirect } from "react-router-dom";
//Redux
import { connect } from "react-redux";
import { getScreams } from "../../redux/actions/dataActions";
//MUI
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
//stuff
import { GetScreamsIcon } from "../icons";

const useStyles = makeStyles({
  root: {
    padding: 3,
  },
});

function GetScreamsBtn({ getScreams, color }) {
  const classes = useStyles();

  const handleClick = () => {
    getScreams();
  };

  return (
    <Tooltip title="Refresh screams list">
      <Button
        onClick={handleClick}
        color={color}
        size="small"
        className={classes.like}
      >
        <GetScreamsIcon />
      </Button>
    </Tooltip>
  );
}

GetScreamsBtn.propTypes = {
  getScreams: PropTypes.func.isRequired,
  color: PropTypes.string,
};

GetScreamsBtn.defaultProps = {
  color: "inherit",
};

const mapActionsToProps = {
  getScreams,
};
export default connect(
  null,
  mapActionsToProps,
)(GetScreamsBtn);

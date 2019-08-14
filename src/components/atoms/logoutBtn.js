import React from "react";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/userActions";

//MUI
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import makeStyles from "@material-ui/core/styles/makeStyles";

//stuff
import { LogoutIcon } from "../icons";

const useStyles = makeStyles(theme => ({
  root: {
    color: "#fff",
    opacity: 0.5,
  },
}));

const LogoutBtn = ({
  authenticated,
  logoutUser,
  className: classNameProps,
}) => {
  const classes = useStyles();

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <Tooltip title="Log out" placement="top">
      <Button
        onClick={handleLogout}
        className={`${classes.root} ${classNameProps}`}
      >
        <LogoutIcon />
      </Button>
    </Tooltip>
  );
};

LogoutBtn.propTypes = {
  logoutUser: PropTypes.func.isRequired,
};
export default connect(
  null,
  { logoutUser },
)(LogoutBtn);

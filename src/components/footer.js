import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//Redux
import { connect } from "react-redux";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
//stuff
import { HomeIcon } from "./icons";
import Notifications from "./user/notifications";
import monster1 from "../images/monster1.png";
import AddScream from "./screams/addScream";

const useStyles = makeStyles(theme => ({
  footer: {
    marginTop: 8,
  },
  root: {
    justifyContent: "space-around",
    maxHeight: 58,
  },
  brand: {
    display: "flex",
    alignItems: "flex-end",
    marginRight: "auto",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    display: "inline-block",
    marginBottom: 4,
  },
  logo: { height: 50 },
}));

const Footer = props => {
  const classes = useStyles();
  return (
    <AppBar
      position="static"
      color="primary"
      component="footer"
      className={classes.footer}
    >
      <Toolbar className={classes.root}>
        <div>
          <Tooltip title="Home">
            <Button component={Link} color="inherit" to="/">
              <HomeIcon />
            </Button>
          </Tooltip>
          {props.authenticated ? (
            <>
              <AddScream />
              <Notifications />
            </>
          ) : null}
        </div>
        <Link to="/">
          <div className={classes.brand}>
            <img src={monster1} alt="logo" className={classes.logo} />
          </div>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

Footer.propTypes = {
  authenticated: PropTypes.bool,
};
const mapStateToProps = state => ({
  authenticated: state.user.authenticated,
});
export default connect(mapStateToProps)(Footer);

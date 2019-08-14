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
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
import { Typography } from "@material-ui/core";

//stuff
import LogoutBtn from "./atoms/logoutBtn";
import GetScreamsBtn from "./atoms/getScreamsBtn";

import Notifications from "./user/notifications";
import logo from "../images/monster2.png";
import AddScream from "./screams/addScream";
import { HomeIcon } from "./icons";

const useStyles = makeStyles(theme => ({
  root: {
    justifyContent: "space-around",
    maxHeight: 58,
    [theme.breakpoints.down("sm")]: {
      padding: 0,
      justifyContent: "space-between",
    },
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
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  nav: {
    display: "flex",
  },
  logo: {
    height: 50,
    [theme.breakpoints.down("xs")]: {
      height: 40,
    },
  },
  avatar: {
    height: 30,
    width: 30,
    border: "2px solid rgba(255,255,255,0.7)",
    padding: 0,
    borderRadius: "50%",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
    "& img": { backgroundColor: "#ffffffdd", height: 30, width: 30 },
  },
  logout: {
    // [theme.breakpoints.down("xs")]: {
    //   display: "none",
    // },
  },
}));

const NavBar = props => {
  const classes = useStyles();
  return (
    <AppBar position="fixed" color="primary">
      <Toolbar className={classes.root}>
        <Tooltip title="Home">
          <Link to="/">
            <div className={classes.brand}>
              <img src={logo} alt="logo" className={classes.logo} />
              <Typography variant="h1" className={classes.title}>
                MonstresClub
              </Typography>
            </div>
          </Link>
        </Tooltip>
        <div className={classes.nav}>
          <Tooltip title="Home">
            <Button component={Link} color="inherit" to="/">
              <HomeIcon />
            </Button>
          </Tooltip>
          <GetScreamsBtn />
          {props.authenticated ? (
            <>
              <AddScream />
              <Notifications />{" "}
              <Box ml={4}>
                <Tooltip title={`You are logged in as ${props.userName}`}>
                  <Avatar
                    src={props.imageUrl}
                    classes={{ root: classes.avatar }}
                  />
                </Tooltip>
              </Box>
              <LogoutBtn className={classes.logout} />
            </>
          ) : (
            <>
              <Button
                component={Link}
                color="inherit"
                to="/signin"
                size="small"
              >
                Log in
              </Button>
              <Button
                component={Link}
                color="inherit"
                to="/signup"
                size="small"
              >
                Sign up
              </Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

NavBar.propTypes = {
  authenticated: PropTypes.bool,
};
const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
  imageUrl: state.user.profile.imageUrl,
  userName: state.user.profile.userName,
});
export default connect(mapStateToProps)(NavBar);

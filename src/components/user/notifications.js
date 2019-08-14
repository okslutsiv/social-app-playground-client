import React, { useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link as RouterLink } from "react-router-dom";

//Redux
import { connect } from "react-redux";
import { markNotificationRead } from "../../redux/actions/userActions";
//MUI
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";
import Tooltip from "@material-ui/core/Tooltip";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import makeStyles from "@material-ui/core/styles/makeStyles";

import { LikeOutlinedIcon, ChatIcon, NotificationIcon } from "../icons";

const useStyles = makeStyles(theme => ({
  notIcon: {
    color: notifications =>
      notifications.length > 0 ? "#fff" : "rgba(0,0,0,0.5) ",
  },
  menuItem: {
    minHeight: "auto",
    fontSize: 12,
  },
  menuItemIcon: {
    color: theme.palette.secondary.main,
    minWidth: 36,
    "& svg": { width: 18 },
  },
  badge: {
    "& span": {
      borderRadius: "50%",
      backgroundColor: theme.palette.error.main,
      color: "#fff",
      display: notifications => (notifications.length > 0 ? "block" : "none"),
    },
  },
  screamLink: {
    margin: "0 8px",
  },
  markAll: {
    backgroundColor: theme.palette.secondary.light,
    color: "#fff",
    fontSize: 14,
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
    color: "#fff",
    fontSize: 14,
    cursor: "auto",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

const Notification = props => {
  const notifications = props.user.notifications;
  dayjs.extend(relativeTime);

  const classes = useStyles(notifications);

  const toolTipText =
    notifications.length > 0
      ? "You have unread notifications"
      : "No new notifications";

  const menuItemIcon = type =>
    type === "comment" ? <ChatIcon /> : <LikeOutlinedIcon />;

  const menuItemText = type =>
    type === "comment" ? "commented on your scream " : "liked your scream ";

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMarkAllAsRead = userName => e => {
    notifications.forEach(not => {
      props.markNotificationRead(userName, not.notificationId);
    });
    setAnchorEl(null);
    // window.history.pushState(null, null, "/");
  };
  const handleMenuItemClick = (userName, notificationId) => e => {
    props.markNotificationRead(userName, notificationId);
    setAnchorEl(null);
  };
  return (
    <>
      <Tooltip title={toolTipText}>
        <Button size="small" onClick={handleClick}>
          <Badge className={classes.badge} badgeContent={notifications.length}>
            <NotificationIcon className={classes.notIcon} />
          </Badge>
        </Button>
      </Tooltip>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {notifications.length > 0 ? (
          <MenuItem
            key="-1"
            onClick={handleMarkAllAsRead(props.user.profile.userName)}
            className={classes.markAll}
            color="secondary"
          >
            <ListItemText> Mark all as read</ListItemText>
            <Divider />
          </MenuItem>
        ) : null}

        {notifications.length > 0 ? (
          notifications.map(not => (
            <MenuItem
              key={not.createdAt + Math.random()}
              className={classes.menuItem}
              onClick={handleMenuItemClick(
                props.user.profile.userName,
                not.notificationId,
              )}
              component={RouterLink}
              to={{
                pathname: `/user/${props.user.profile.userName}/scream/${
                  not.screamId
                }`,
              }}
            >
              <ListItemIcon className={classes.menuItemIcon}>
                {menuItemIcon(not.type)}
              </ListItemIcon>
              <span style={{ fontWeight: "bold", marginRight: 8 }}>
                {not.sender}
              </span>{" "}
              {menuItemText(not.type)} {dayjs().to(dayjs(not.createdAt))}
            </MenuItem>
          ))
        ) : (
          <MenuItem className={classes.info}>Nothing to display</MenuItem>
        )}
      </Menu>
    </>
  );
};
Notification.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  user: state.user,
});
export default connect(
  mapStateToProps,
  { markNotificationRead },
)(Notification);

/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import { Link } from "react-router-dom";
//MUI
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";

import image from "../images/monster404.png";

const useStyles = makeStyles(theme => ({
  image: {
    width: "auto",
    height: "30vh",
  },
}));

const NotFound = props => {
  const classes = useStyles();
  return (
    <Container maxWidth="xs">
      <Box
        height="calc(100vh - 120px)"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <img src={image} alt="404 page" className={classes.image} />
        <Typography variant="h1" color="primary">
          404Error
        </Typography>
        <Link to="/">
          <Typography variant="h6" color="secondary">
            Return to Home Page
          </Typography>
        </Link>
      </Box>
    </Container>
  );
};

export default NotFound;

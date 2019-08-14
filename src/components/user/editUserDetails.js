//====
// user can edit his profile details, if logged in
// The component is a modal and it's form fields are prepopulated with current state data
// if no data for a field it will be an empty string
//====

import React, { useState } from "react";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";

//MUI
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import makeStyles from "@material-ui/core/styles/makeStyles";

//stuff
import { editUserDetails } from "../../redux/actions/userActions";
import { EditIcon } from "../icons";
import monster from "../../images/monster2.png";

const useStyles = makeStyles(theme => ({
  img: {
    height: 80,
    display: "block",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  desc: {
    ...theme.text.small,
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
    },
  },
}));

const EditDetails = props => {
  const classes = useStyles();
  //  props from parent
  const { profile } = props;
  // props from redux
  const { editUserDetails } = props;
  const profileDetails = {};

  const [details, setDetails] = useState({});

  profileDetails.bio = profile.bio;
  profileDetails.location = profile.location;
  profileDetails.website = profile.website;

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setDetails(profileDetails);
  };

  const handleSubmit = e => {
    e.preventDefault();
    editUserDetails(details);
    handleClose();
  };

  const handleChange = e => {
    console.log(e.target.name, e.target.value);
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Edit details" placement="top-start">
        <Button color="secondary" onClick={handleOpen}>
          <EditIcon />
        </Button>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <Container maxWidth="sm">
          <Typography variant="h6" color="primary">
            Edit your details
          </Typography>
          <Grid container alignItems="flex-end">
            <Grid item xs={12} sm={8}>
              <Typography className={classes.desc}>
                Please tell us more about yourself.
                <br /> You can edit your public email as well.
                <br />
                Note, that this will not affect the email that is used for
                logging in.{" "}
              </Typography>
            </Grid>
            <Grid item xs="auto" sm={4} container justify="flex-end">
              <img src={monster} alt="monster" className={classes.img} />
            </Grid>{" "}
          </Grid>
        </Container>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              value={details.bio}
              name="bio"
              onChange={handleChange}
              margin="dense"
              id="bio"
              multiline
              rows={3}
              label="Short bio"
              type="textarea"
              variant="filled"
              fullWidth
              placeholder={profile.bio}
            />
            <TextField
              value={details.location}
              name="location"
              onChange={handleChange}
              margin="dense"
              id="location"
              label="Your current location"
              type="text"
              variant="filled"
              fullWidth
              placeholder={profile.location}
            />
            <TextField
              value={details.website}
              name="website"
              onChange={handleChange}
              margin="dense"
              id="website"
              label="Website"
              type="text"
              variant="filled"
              fullWidth
              placeholder={profile.website}
            />
          </DialogContent>
          <Container maxWidth="sm">
            {" "}
            <Box display="flex" justifyContent="space-around" mb={2}>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary" variant="contained">
                Submit
              </Button>{" "}
            </Box>
          </Container>
        </form>
      </Dialog>
    </>
  );
};

EditDetails.propTypes = {
  user: PropTypes.object,
  authenticated: PropTypes.bool,
  editUserDetails: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  user: state.user,
  authenticated: state.auth.authenticated,
});
const mapActionsToProps = {
  editUserDetails,
};

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(EditDetails);

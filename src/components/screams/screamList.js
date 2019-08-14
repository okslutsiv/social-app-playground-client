import React from "react";
import PropTypes from "prop-types";

import ScreamCard from "./screamCard";
//MUI
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const ScreamList = ({ screams = [] }) => {
  return screams.length === 0 ? (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="5rem"
    >
      <Typography color="textSecondary">No screams to display</Typography>
    </Box>
  ) : (
    screams.map((scream, index) => (
      <div key={scream.screamId}>
        <ScreamCard scream={scream} commentsCount={scream.commentsCount} />
      </div>
    ))
  );
};

ScreamList.propTypes = {
  screams: PropTypes.array.isRequired,
};
export default ScreamList;

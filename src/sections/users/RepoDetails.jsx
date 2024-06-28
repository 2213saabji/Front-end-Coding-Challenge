import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import { Box } from '@mui/material';

import HighchartsComponent from './HighchartsComponent';

export default function RepoDetails({ repo }) {
  const [commitData, setCommitData] = useState(null);
  useEffect(() => {
    fetchCommitData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fetchCommitData = async () => {
    const response = await fetch(`https://api.github.com/repos/${repo?.full_name}/commits`);
    const data = await response.json();
    setCommitData(data);
  };

  return (
    <Box>
      {commitData ? (
        <HighchartsComponent data={commitData} />
      ) : (
        <Box
        sx={{
          minHeight: "100vh",
          "& > *": { marginBottom: 5 },
          background: "#161b22",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <span className="loader"></span>
      </Box>
      )}
    </Box>
  );
}
RepoDetails.propTypes = {
  repo: PropTypes.object,
};
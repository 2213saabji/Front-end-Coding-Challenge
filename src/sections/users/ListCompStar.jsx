import { useState } from 'react';
import PropTypes from 'prop-types';

import { Box, Stack, Avatar, Typography } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import RepoDetails from "./RepoDetails"

const options = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  timeZone: 'UTC'
};


export default function ListCompStar({ StaredCardData }) {

  const [openPopup, setOpenPopup] = useState(false);
  const date = new Date(StaredCardData?.pushed_at);
  const [time, setTime] = useState(date.toLocaleString('en-US', options))
  const push = () => {
    window.location.href = StaredCardData?.clone_url;
  }
  return (
    <Stack
      sx={{
        color: "black",
        background: "#0d1117",
        border: "1px solid black",
        minHeight: { xs: "auto", sm: openPopup ? "500px" : "100px", md: openPopup ? "500px" : "100px" },
        mx: { xs: 1, sm: 10, md: 20 },
        p: openPopup ? "10px" : "0px",
        boxShadow: "0px 0px 5px #fff8",
        borderRadius: "5px",
        transition: "min-height 0.3s ease, padding 0.3s ease"
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row", md: "row" }}
        alignItems="center"
        justifyContent="space-between"
        sx={{
          color: "black",
          background: "#0d1117",
          border: "1px solid black",
          minHeight: { xs: "auto", sm: "100px", md: "100px" },
          py: 2,
          px: 1,
          boxShadow: "0px 0px 5px #fff8",
          borderRadius: "5px"
        }}
      >
        <Avatar
          sx={{
            height: "100px",
            width: "100px",
            mr: { xs: 1, sm: 5, md: 5 },
            mb: { xs: 5, sm: 0, md: 0 },
            cursor: "pointer"
          }}
          onClick={push}
          src={StaredCardData?.owner?.avatar_url}
        />
        <Stack
          alignItems={{ xs: "center", sm: "flex-start", md: "flex-start" }}
          sx={{ gap: 1, flexGrow: 1 }}
        >
          <Typography
            onClick={push}
            sx={{
              cursor: 'pointer',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            {StaredCardData?.name}
          </Typography>
          <Typography
            sx={{
              textAlign: { xs: "center", sm: "left", md: "left" }
            }}
          >
            {StaredCardData?.description}
          </Typography>
          <Stack
            direction="row"
            sx={{ gap: 5 }}
          >
            <Box
              sx={{ textWrap: "nowrap" }}
            >
              Stars : {StaredCardData?.stargazers_count}
            </Box>
            <Box
              sx={{ textWrap: "nowrap" }}
            >
              Issues : {StaredCardData?.open_issues}
            </Box>
            <Box>Pushed At : {time} - by - {StaredCardData?.owner?.login}</Box>
          </Stack>
        </Stack>
        <ArrowForwardIosIcon
          sx={{
            display: { xs: "none", sm: "block", md: "block" },
            transform: openPopup ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease"
          }}
          onClick={() => setOpenPopup(!openPopup)}
        />
      </Stack>
      {openPopup && (
        <RepoDetails repo={StaredCardData} />
      )}
    </Stack>

  )
}

ListCompStar.propTypes = {
  StaredCardData: PropTypes.object,
};
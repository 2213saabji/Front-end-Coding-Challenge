
import React, { useEffect, useState } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import { styled } from '@mui/material/styles';
import { Box, Typography } from "@mui/material";

import { useAuth } from "src/auth/context/auth-provider";

import ListCompStar from "../ListCompStar";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: '#000', 
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    color: 'white', 
    '&:focus': {
      borderRadius: 4,
      borderColor: "white",
      color: 'white',
      boxShadow: '0 0 0 0.2rem #fff5',
    },
  },
}));

export default function ListStaredUsers() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(user == null)
  const [time, setTime] = useState("all");

  const handleChange = (event) => {
    setTime(event.target.value);
  };

  useEffect(() => {
    setLoading(user == null);
  }, [user])

  const filterRepos = (repos, duration) => {
    if (duration === "all") {
      return repos;
    }

    const formatDate = (isoDateString) => {
      const date = new Date(isoDateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const now = new Date();
    const filteredRepos = repos.filter((repo) => {
      const createdAt = new Date(formatDate(repo.created_at));
      switch (duration) {
        case "oneWeek":
          return now - createdAt <= 7 * 24 * 60 * 60 * 1000;
        case "twoWeek":
          return now - createdAt <= 14 * 24 * 60 * 60 * 1000;
        case "oneMonth":
          return now - createdAt <= 30 * 24 * 60 * 60 * 1000;
        case "oneYear":
          return now - createdAt <= 365 * 24 * 60 * 60 * 1000;
        case "twoYear":
          return now - createdAt <= 2 * 365 * 24 * 60 * 60 * 1000;
        case "threeYear":
          return now - createdAt <= 3 * 365 * 24 * 60 * 60 * 1000;
        case "fourYear":
          return now - createdAt <= 4 * 365 * 24 * 60 * 60 * 1000;
        case "fiveYear":
          return now - createdAt <= 5 * 365 * 24 * 60 * 60 * 1000;
        case "sixYear":
          return now - createdAt <= 6 * 365 * 24 * 60 * 60 * 1000;
        case "sevenYear":
          return now - createdAt <= 7 * 365 * 24 * 60 * 60 * 1000;
        case "eightYear":
          return now - createdAt <= 8 * 365 * 24 * 60 * 60 * 1000;
        case "nineYear":
          return now - createdAt <= 9 * 365 * 24 * 60 * 60 * 1000;
        case "tenYear":
          return now - createdAt <= 10 * 365 * 24 * 60 * 60 * 1000;
        default:
          return true;
      }
    });

    return filteredRepos;
  };
  return (
    <>
      {loading === false &&
        <Box
          sx={{
            minHeight: "100vh",
            "& > *": { marginBottom: 5 },
            background: "#161b22",
          }}
        >
          <Typography
            sx={{
              fontSize: 100,
              fontWeight: 'bold',
              textDecoration: 'underline',
              textAlign: 'center',
              mb: 5,
            }}
          >
            Starred Repos
          </Typography>
          <Box sx={{ mx: "auto", textAlign: "center" }}>
            <FormControl sx={{ minWidth: 120,textAlign: "center" }}>
              <NativeSelect
                id="demo-customized-select-native"
                value={time}
                onChange={handleChange}
                input={<BootstrapInput />}
              >
                <option value="all" style={{ color: "black" }}>All</option>
                <option value="oneWeek" style={{ color: "black" }}>1 week</option>
                <option value="twoWeek" style={{ color: "black" }}>2 week</option>
                <option value="oneMonth" style={{ color: "black" }}>1 Month</option>
                <option value="oneYear" style={{ color: "black" }}>1 Year</option>
                <option value="twoYear" style={{ color: "black" }}>2 Years</option>
                <option value="threeYear" style={{ color: "black" }}>3 Years</option>
                <option value="fourYear" style={{ color: "black" }}>4 Years</option>
                <option value="fiveYear" style={{ color: "black" }}>5 Years</option>
                <option value="sixYear" style={{ color: "black" }}>6 Years</option>
                <option value="sevenYear" style={{ color: "black" }}>7 Years</option>
                <option value="eightYear" style={{ color: "black" }}>8 Years</option>
                <option value="nineYear" style={{ color: "black" }}>9 Years</option>
                <option value="tenYear" style={{ color: "black" }}>10 Years</option>

              </NativeSelect>
            </FormControl>
          </Box>
          {user && filterRepos(user.items, time).map((item) => (
            <ListCompStar StaredCardData={item} />
          ))}

        </Box>
      }
      {loading === true &&
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
      }
    </>
  );
}

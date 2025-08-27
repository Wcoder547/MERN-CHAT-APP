import React from "react";
import AppLayout from "../components/layout/AppLayout";
import { grayColor } from "../constants/color";
import { Box, Typography } from "@mui/material";

const Home = () => {
  
  return <>
   <title>Chat App - Home</title>
      <meta
        name="description"
        content="This is the MERN Chat App homepage"
      />
      <meta name="author" content="Waseem Akram" />

     
   <Box bgcolor={grayColor} height={"100%"}>
      <Typography p={"2rem"} variant="h5" textAlign={"center"}>
        Select a friend to chat
      </Typography>
    </Box>
  </>;
};


const HomeWithLayout = AppLayout(Home);

export default HomeWithLayout;

import React from "react";
import AppLayout from "../components/layout/AppLayout";

const Home = () => {
  
  return <>
   <title>Chat App - Home</title>
      <meta
        name="description"
        content="This is the MERN Chat App homepage"
      />
      <meta name="author" content="Waseem Akram" />

      <div>Home</div>
  </>;
};


const HomeWithLayout = AppLayout(Home);

export default HomeWithLayout;

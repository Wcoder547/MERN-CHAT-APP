import React from "react";
import Header from "./Header";
import Title from "../shared/Title";
import { Grid } from "@mui/material";

const AppLayout = (WrappedContent) => {
  const HOC = (props) => {
    return (
      <>
        <Title />
        <Header />
        <Grid container height={"calc(100vh - 4rem)"}>
          {/* Left sidebar */}
          <Grid
            size={{ sm: 4, md: 3 }}
            sx={{
              display: { xs: "none", sm: "block" },
              borderRight: "1px solid #ccc",
            }}
            height="100%">
            First
          </Grid>

          {/* Main content */}
          <Grid size={{ xs: 12, sm: 8, md: 5, lg: 6 }} height="100%">
            <WrappedContent {...props} />
          </Grid>

          {/* Right sidebar */}
          <Grid
            size={{ md: 4, lg: 3 }}
            height="100%"
            sx={{
              display: { xs: "none", md: "block" },
              bgcolor: "rgba(0,0,0,0.85)",
              borderLeft: "1px solid #ccc",
              color: "#fff", // text visible on dark background
            }}>
            Third
          </Grid>
        </Grid>
      </>
    );
  };

  HOC.displayName = `AppLayout(${
    WrappedContent.displayName || WrappedContent.name || "Component"
  })`;

  return HOC;
};

export default AppLayout;

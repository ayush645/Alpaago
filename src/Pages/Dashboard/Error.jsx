import React from "react";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const Error = ({ error }) => {
  return (
    <Grid
      container
      spacing={2}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
        }}
      >
        <Card
          style={{
            width: "300px",
            backgroundColor: "#1f293b",
            border: "1px solid white",
          }}
        >
          <CardContent style={{ display: "flex", alignItems: "center" }}>
            <Typography
              style={{
                fontFamily: "Poppins",
                fontSize: "30px",
                color: "white",
              }}
            >
              {error}
            </Typography>
            <CloseRoundedIcon
              style={{ color: "red", width: "60px", height: "60px" }}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Error;

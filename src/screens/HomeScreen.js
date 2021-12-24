import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@material-ui/core/Box";
import TouchApp from "@material-ui/icons/TouchApp";
import Logo from "../components/Logo";
import { useStyles } from "../styles";
import { Card, CardActionArea, Typography } from "@material-ui/core";

export default function HomeScreen() {
  let navigate = useNavigate();
  const styles = useStyles();

  return (
    <Card>
      <CardActionArea onClick={() => navigate("/choose")}>
        <Box className={`${styles.root} ${styles.red}`}>
          <Box className={`${styles.main} ${styles.center}`}>
            <Typography component="h6" variant="h6">
              Fast & Easy
            </Typography>
            <Typography component="h1" variant="h1">
              Order <br /> & pay <br /> here
            </Typography>
            <TouchApp fontSize="large"></TouchApp>
          </Box>
          <Box className={`${styles.green} ${styles.center}`}>
            <Logo large></Logo>
            <Typography component="h5" variant="h5">
              Touch to Start
            </Typography>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
}

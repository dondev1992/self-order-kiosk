import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Fade,
  Typography,
} from "@material-ui/core";
import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { setOrderType } from "../actions";
import Logo from "../components/Logo";
import { Store } from "../Store";
import { useStyles } from "../styles";

export default function ChooseScreen() {
  const styles = useStyles();
  const { dispatch } = useContext(Store);
  let navigate = useNavigate();

  const chooseHandler = (orderType) => {
    setOrderType(dispatch, orderType);
    navigate("/order");
  };
  return (
    <Fade in={true}>
      <Box className={`${styles.root} ${styles.navy}`}>
        <Box className={`${styles.main} ${styles.center}`}>
          <Logo large></Logo>
          <Typography
            component="h3"
            variant="h3"
            gutterBottom
            className={styles.center}
          >
            Where will you be eating today?
          </Typography>
          <Box className={styles.cards}>
            <Card className={`${styles.card} ${styles.space}`}>
              <CardActionArea onClick={() => chooseHandler("Eat In")}>
                <CardMedia
                  component="img"
                  alt="Eat In"
                  image="/images/eatin.png"
                  className={styles.media}
                />
                <CardContent>
                  <Typography
                    component="p"
                    variant="h4"
                    gutterBottom
                    color="textPrimary"
                  >
                    Eat In
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card className={`${styles.card} ${styles.space}`}>
              <CardActionArea onClick={() => chooseHandler("Take Out")}>
                <CardMedia
                  component="img"
                  alt="Take Out"
                  image="/images/takeout.png"
                  className={styles.media}
                />
                <CardContent>
                  <Typography
                    component="p"
                    variant="h4"
                    gutterBottom
                    color="textPrimary"
                  >
                    Take Out
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        </Box>
      </Box>
    </Fade>
  );
}

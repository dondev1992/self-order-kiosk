import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import React, { useContext } from "react";
import { setPaymentType } from "../actions";
import Logo from "../components/Logo";
import { Store } from "../Store";
import { useStyles } from "../styles";
import { useNavigate } from "react-router-dom";

export default function SelectPaymentScreen() {
  const { dispatch } = useContext(Store);
  const styles = useStyles();
  let navigate = useNavigate();

  const selectHandler = (paymentType) => {
    setPaymentType(dispatch, paymentType);
    if (paymentType === "Pay here") {
      navigate("/payment");
    } else {
      navigate("/complete");
    }
  };
  return (
    <Box className={`${styles.root} ${styles.navy}`}>
      <Box className={`${styles.main} ${styles.center}`}>
        <Logo large></Logo>
        <Typography
          className={styles.center}
          gutterBottom
          variant="h3"
          component="h3"
        >
          Select Payment Type
        </Typography>
      </Box>
      <Box className={styles.cards}>
        <Card className={`${styles.card} ${styles.space}`}>
          <CardActionArea
            onClick={() => {
              selectHandler("Pay here");
            }}
          >
            <CardMedia
              component="img"
              alt="Pay Here"
              image="/images/payhere.png"
              className={styles.media}
            />

            <CardContent>
              <Typography
                gutterBottom
                variant="h6"
                color="textPrimary"
                component="p"
              >
                PAY HERE
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className={`${styles.card} ${styles.space}`}>
          <CardActionArea
            onClick={() => {
              selectHandler("At Counter");
            }}
          >
            <CardMedia
              component="img"
              alt="Pay Here"
              image="/images/atcounter.png"
              className={styles.media}
            />

            <CardContent>
              <Typography
                gutterBottom
                variant="h6"
                color="textPrimary"
                component="p"
              >
                AT COUNTER
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </Box>
  );
}

import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  DialogTitle,
  Grid,
  List,
  ListItem,
  TextField,
  Typography,
} from "@material-ui/core";
import { Store } from "../Store";
import { useStyles } from "../styles";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import Alert from "@material-ui/lab/Alert";
import React, { useContext, useEffect, useState } from "react";
import {
  listCategories,
  listProducts,
  addToOrder,
  removeFromOrder,
  clearOrder,
} from "../actions";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import Dialog from "@material-ui/core/Dialog";

export default function OrderScreen(props) {
  const styles = useStyles();
  const [categoryName, setCategoryName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState({});

  let navigate = useNavigate();

  const { state, dispatch } = useContext(Store);
  const { categories, loading, error } = state.categoryList;
  const {
    products,
    loading: loadingProducts,
    error: errorProducts,
  } = state.productList;

  const { orderItems, itemsCount, totalPrice, taxPrice, orderType } =
    state.order;

  useEffect(() => {
    if (!orderItems) {
      clearOrder(dispatch);
    }
  }, []);

  useEffect(() => {
    if (!categories) {
      listCategories(dispatch);
    } else {
      listProducts(dispatch, categoryName);
    }
  }, [dispatch, categories, categoryName]);

  const closeHandler = () => {
    setIsOpen(false);
  };
  const productClickHandler = (p) => {
    setProduct(p);
    setIsOpen(true);
  };
  const addToOrderHandler = () => {
    addToOrder(dispatch, { ...product, quantity });
    setIsOpen(false);
  };
  const cancelOrRemoveFromOrder = () => {
    removeFromOrder(dispatch, product);
    setIsOpen(false);
  };

  const categoryClickHandler = (name) => {
    setCategoryName(name);
    listProducts(dispatch, categoryName);
  };

  const previewOrderHandler = () => {
    navigate("/review");
  };

  return (
    <Box className={styles.root}>
      <Dialog
        maxWidth="sm"
        fullWidth={true}
        open={isOpen}
        onClose={closeHandler}
      >
        <DialogTitle className={styles.center}>Add {product.name}</DialogTitle>

        <Box className={`${styles.row} ${styles.center}`}>
          <Button
            variant="contained"
            color="primary"
            disabled={quantity === 1}
            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
          >
            <RemoveIcon />
          </Button>
          <TextField
            inputProps={{ className: styles.largeInput }}
            InputProps={{
              bar: "true",
              inputProps: {
                className: styles.largeInput,
              },
            }}
            className={styles.largeNumber}
            type="number"
            variant="filled"
            min={1}
            value={quantity}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => setQuantity(quantity + 1)}
          >
            <AddIcon />
          </Button>
        </Box>
        <Box className={`${styles.row} ${styles.around}`}>
          <Button
            onClick={cancelOrRemoveFromOrder}
            variant="contained"
            color="primary"
            size="large"
            className={styles.largeButton}
          >
            {orderItems?.find((x) => x.name === product.name)
              ? "Remove From Order"
              : "Cancel"}
          </Button>
          <Button
            onClick={addToOrderHandler}
            variant="contained"
            color="primary"
            size="large"
            className={styles.largeButton}
          >
            Add To Order
          </Button>
        </Box>
      </Dialog>
      <Box className={styles.main}>
        <Grid container>
          <Grid item md={2}>
            <List>
              {loading ? (
                <CircularProgress />
              ) : error ? (
                <Alert severity="error">{alert}</Alert>
              ) : (
                <>
                  <ListItem onClick={() => categoryClickHandler("")} button>
                    <Logo />
                  </ListItem>
                  {categories.map((category) => (
                    <ListItem
                      key={category.name}
                      button
                      onClick={() => categoryClickHandler(category.name)}
                    >
                      <Avatar src={category.image} alt={category.name}></Avatar>
                    </ListItem>
                  ))}
                </>
              )}
            </List>
          </Grid>
          <Grid item md={10}>
            <Typography
              gutterBottom
              className={styles.title}
              variant="h2"
              component="h2"
            >
              {categoryName || "Main Menu"}
            </Typography>
            <Grid container spacing={1}>
              {loadingProducts ? (
                <CircularProgress />
              ) : error ? (
                <Alert severity="error">{errorProducts}</Alert>
              ) : (
                products.map((product) => (
                  <Grid key={product.name} item md={6}>
                    <Card
                      className={styles.card}
                      onClick={() => productClickHandler(product)}
                    >
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          alt={product.name}
                          image={product.image}
                          className={styles.media}
                        />
                      </CardActionArea>
                      <CardContent>
                        <Typography
                          gutterBottom
                          color="textPrimary"
                          variant="body2"
                          component="p"
                        >
                          {product.name}
                        </Typography>
                        <Box className={styles.cardFooter}>
                          <Typography
                            color="textSecondary"
                            variant="body2"
                            component="p"
                          >
                            {product.calorie} Cal
                          </Typography>
                          <Typography
                            color="textPrimary"
                            variant="body2"
                            component="p"
                          >
                            ${product.price}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Box>
          <Box className={`${styles.bordered} ${styles.space}`}>
            My Order - {orderType} | Tax: ${taxPrice} | Total: ${totalPrice} |
            Items: {itemsCount}
          </Box>
          <Box className={`${styles.row} ${styles.around}`}>
            <Button
              onClick={() => {
                clearOrder(dispatch);
                navigate("/");
              }}
              variant="contained"
              color="primary"
              className={styles.largeButton}
            >
              Cancel Order
            </Button>
            <Button
              onClick={previewOrderHandler}
              variant="contained"
              color="primary"
              disabled={orderItems?.length === 0}
              className={styles.largeButton}
            >
              Done
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

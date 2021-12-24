import { Container, CssBaseline, Paper } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { createTheme } from "@material-ui/core/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import ChooseScreen from "./screens/ChooseScreen";
import HomeScreen from "./screens/HomeScreen";
import OrderScreen from "./screens/OrderScreen";
import ReviewScreen from "./screens/ReviewScreen";
import SelectPaymentScreen from "./screens/SelectPaymentScreen";
import PaymentScreen from "./screens/PaymentScreen";
import CompleteOrderScreen from "./screens/CompleteOrderScreen";

const theme = createTheme({
  typography: {
    h1: { fontWeight: "bold" },
    h2: {
      fontSize: "2rem",
      color: "black",
    },
    h3: {
      fontSize: "1.8rem",
      fontWeight: "bold",
      color: "white",
    },
  },
  palette: {
    primary: { main: "#ff1744" },
    secondary: {
      main: "#118e16",
      contrastText: "#ffffff",
    },
  },
});

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="sm">
          <Paper>
            <Routes>
              <Route path="/" element={<HomeScreen />} exact={true}></Route>
              <Route
                path="/choose"
                element={<ChooseScreen />}
                exact={true}
              ></Route>
              <Route
                path="/order"
                element={<OrderScreen />}
                exact={true}
              ></Route>
              <Route
                path="/review"
                element={<ReviewScreen />}
                exact={true}
              ></Route>
              <Route
                path="/select-payment"
                element={<SelectPaymentScreen />}
                exact={true}
              ></Route>
              <Route
                path="/payment"
                element={<PaymentScreen />}
                exact={true}
              ></Route>
              <Route
                path="/complete"
                element={<CompleteOrderScreen />}
                exact={true}
              ></Route>
            </Routes>
          </Paper>
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

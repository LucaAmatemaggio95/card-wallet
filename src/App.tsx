import { createTheme, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import CardsAdd from "./components/cardForm/CardsAdd";
import Cards from "./components/cardList/Cards";
import NoMatch from "./components/NoMatch/NoMatch";

let theme = createTheme({
  palette: {
    primary: {
      main: "#002b49"
    },
    secondary: {
      main: "#e5e5e5"
    }
  }
});

theme = createTheme(theme, {
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${theme.palette.secondary.main}`,
          backdropFilter: "blur(10px)"
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "24px"
        }
      }
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="cards" element={<Cards />}>
          <Route path="add" element={<CardsAdd />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;

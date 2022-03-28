import { Outlet } from "react-router-dom";
import "../styles/App.css";
import Drawer from "./Drawer";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../themes/theme";
import { Container } from "@mui/material";
import { AlertProvider, AlertSnack } from "./utils/AlertProvider";
import AuthProvider from "./utils/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <AlertProvider>
        <ThemeProvider theme={theme}>
          <div
            style={{
              display: "flex",
            }}
          >
            <Drawer />
            <Container
              sx={{
                paddingTop: "0.5em",
                paddingBottom: "0.5em",
              }}
            >
              <Outlet />
            </Container>
            <AlertSnack />
          </div>
        </ThemeProvider>
      </AlertProvider>
    </AuthProvider>
  );
}

export default App;

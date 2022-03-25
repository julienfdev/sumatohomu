import { Outlet } from "react-router-dom";
import "../styles/App.css";
import Drawer from "./Drawer";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../themes/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: "flex",
        }}
      >
        <Drawer />
        <Outlet />
      </div>
    </ThemeProvider>
  );
}

export default App;

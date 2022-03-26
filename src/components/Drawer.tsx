import { FunctionComponent, ReactElement, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import theme from "../themes/theme";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Sensors, Dashboard, Person, Lightbulb } from "@mui/icons-material";

const drawerWidth = 200;
const linkList: {
  path: string;
  icon?: ReactElement;
  text: string;
}[] = [
  { path: "/", text: "Dashboard", icon: <Dashboard /> },
  { path: "/actuators", text: "Actuateurs", icon: <Lightbulb /> },
  { path: "/sensors", text: "Sensors", icon: <Sensors /> },
  { path: "/users", text: "Utilisateurs", icon: <Person /> },
];

const DrawerContainer: FunctionComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState(-1);

  useEffect(() => {
    setSelected(
      linkList.findIndex((value) => location.pathname === value.path)
    );
  }, [location]);

  return (
    <Drawer
      open={true}
      variant={"persistent"}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          backgroundColor: theme.palette.primary.light,
          boxShadow: "0 0 30px rgba(0, 0, 0, 0.2)",
          boxSizing: "border-box",
        },
        "& .Mui-selected": {
          backgroundColor: "rgba(255,255,255,0.2)",
        },
      }}
    >
      <List>
        {linkList.map((value, index) => (
          <ListItem
            key={value.path}
            sx={{
              color: "white",
              padding: 0,
            }}
            onClick={() => {
              navigate(value.path);
            }}
          >
            <ListItemButton selected={selected === index}>
              <ListItemIcon
                sx={{
                  color: "white",
                }}
              >
                {value.icon || "NA"}
              </ListItemIcon>
              <ListItemText>{value.text}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default DrawerContainer;

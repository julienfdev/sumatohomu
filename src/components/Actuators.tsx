import { AddCircle } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Grid,
  List,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import {
  ChangeEvent,
  Fragment,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import Actuator, { ActuatorType } from "../interfaces/Actuator";
import AddActuator from "./dialogs/AddActuator";
import ActuatorListItem from "./utils/ActuatorListItem";

const spoof = [
  {
    id: "2309234",
    type: ActuatorType.BLINDS,
    designation: "Volet",
    state: false,
  },
  {
    id: "2309254",
    type: ActuatorType.LIGHT,
    designation: "Lumière salon",
    state: true,
  },
] as Actuator[];

const Actuators: FunctionComponent = () => {
  const [initialized, setInitialized] = useState(false);
  const [actuators, setActuators] = useState([] as Actuator[]);
  const [showAddActuator, setShowAddActuator] = useState(false);

  useEffect(() => {
    // spoofing, API CALL
    setActuators([...spoof]);
    setTimeout(() => {
      setInitialized(true);
    }, 500);
  }, []);
  const handleCheckChange = (
    actuator: Actuator,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    actuator.state = e.target.checked;
    setActuators([...actuators]);
    // API CALL and handling
  };
  const handleDelete = (actuator: Actuator) => {
    // API Call : delete
    // Optimistic :
    const buffer = actuators.filter((value) => value.id !== actuator.id);
    setActuators([...buffer]);
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12}>
        <Typography variant="h3" align="center">
          Actuateurs
        </Typography>
      </Grid>
      {initialized ? (
        <Fragment>
          <Grid item xs={12} sm={8} md={6} lg={5} xl={3}>
            <Stack>
              <List>
                {actuators.map((actuator) => (
                  <ActuatorListItem
                    key={actuator.id}
                    onCheckChange={handleCheckChange}
                    onDelete={handleDelete}
                    actuator={actuator}
                  />
                ))}
              </List>
              <Box justifyContent={"center"} display="flex">
                <Button
                  color="primary"
                  sx={{ borderRadius: 5 }}
                  onClick={() => setShowAddActuator(true)}
                >
                  <AddCircle sx={{ marginRight: 1 }} /> Ajouter
                </Button>
              </Box>
            </Stack>
          </Grid>
          <AddActuator
            show={showAddActuator}
            onClose={() => setShowAddActuator(false)}
            onAddedActuator={(actuator) =>
              setActuators([...actuators, actuator])
            }
          />
        </Fragment>
      ) : (
        <Grid item xs={12} justifyContent="center" display={"flex"}>
          <CircularProgress color="secondary" />
        </Grid>
      )}
    </Grid>
  );
};
export default Actuators;

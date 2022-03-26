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
  useContext,
  useEffect,
  useState,
} from "react";
import Actuator, { ActuatorType } from "../interfaces/Actuator";
import AddActuator from "./dialogs/AddActuator";
import ActuatorListItem from "./utils/ActuatorListItem";
import { AlertContext } from "./utils/AlertProvider";
import request from "../modules/request";
import { AxiosError } from "axios";

const Actuators: FunctionComponent = () => {
  const [initialized, setInitialized] = useState(false);
  const [actuators, setActuators] = useState([] as Actuator[]);
  const [showAddActuator, setShowAddActuator] = useState(false);
  const { showAlert } = useContext(AlertContext);
  const getActuators = async () => {
    try {
      const response = await request.get("actuator");
      setActuators([...response.data]);
      setInitialized(true);
    } catch (error) {
      showAlert("error", error as string);
    }
  };
  const updateActuator = async (actuator: Actuator) => {
    try {
      const response = await request.put(`actuator/${actuator.id}`, {
        state: actuator.state,
      });
      setActuators([...actuators]);
    } catch (error) {
      showAlert("error", error as string);
    }
  };
  const deleteActuator = async (actuator: Actuator) => {
    try {
      const response = await request.delete(`actuator/${actuator.id}`);
      setActuators(actuators.filter((value) => value.id !== actuator.id));
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      showAlert("error", axiosError.response?.data);
    }
  };
  
  useEffect(() => {
    getActuators();
  }, []);
  const handleCheckChange = (
    actuator: Actuator,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    actuator.state = e.target.checked;
    updateActuator(actuator);
  };
  const handleDelete = (actuator: Actuator) => {
    deleteActuator(actuator);
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

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
import { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Sensor, SensorGet, SensorType } from "../interfaces/Sensor";
import AddSensor from "./dialogs/AddSensor";
import SensorListItem from "./utils/SensorListItem";

const spoof = [
  {
    id: "2309234",
    type: SensorType.TEMPERATURE,
    designation: "Température",
    rawValue: 740,
    value: "23.4°C",
  },
  {
    id: "2309214",
    type: SensorType.HUMIDITY,
    designation: "Humidité",
    rawValue: 343,
    value: "35%HR",
  },
] as SensorGet[];

const Sensors: FunctionComponent = () => {
  const [initialized, setInitialized] = useState(false);
  const [sensors, setSensors] = useState([] as SensorGet[]);
  const [showAddSensor, setShowAddSensor] = useState(false);
  const [intervalId, setIntervalId] = useState(0 as any);

  useEffect(() => {
    const setWatchdog = () => {
      if (!intervalId) {
        setIntervalId(
          setInterval(() => {
            // FakeGetSensor
            console.log("Get sensors");
          }, 5000)
        );
      }
    };
    // spoofing, API CALL
    setSensors([...spoof]);
    setWatchdog();
    setTimeout(() => {
      setInitialized(true);
    }, 500);
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);

  const handleDelete = (sensor: Sensor) => {
    // API Call : delete
    // Optimistic :
    const buffer = sensors.filter((value) => value.id !== sensor.id);
    setSensors([...buffer]);
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12}>
        <Typography variant="h3" align="center">
          Capteurs
        </Typography>
      </Grid>
      {initialized ? (
        <Fragment>
          <Grid item xs={12} sm={8} md={6} lg={5} xl={3}>
            <Stack>
              <List>
                {sensors.map((sensor) => (
                  <SensorListItem
                    key={sensor.id}
                    onDelete={handleDelete}
                    sensor={sensor}
                  />
                ))}
              </List>
              <Box justifyContent={"center"} display="flex">
                <Button
                  color="primary"
                  sx={{ borderRadius: 5 }}
                  onClick={() => setShowAddSensor(true)}
                >
                  <AddCircle sx={{ marginRight: 1 }} /> Ajouter
                </Button>
              </Box>
            </Stack>
          </Grid>
          <AddSensor
            show={showAddSensor}
            onClose={() => setShowAddSensor(false)}
            onAddedSensor={(sensor) => setSensors([...sensors, sensor])}
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
export default Sensors;

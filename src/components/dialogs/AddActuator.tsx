import { FunctionComponent, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import Actuator, { ActuatorType } from "../../interfaces/Actuator";
import { v1 } from "uuid";
import { Box } from "@mui/system";
interface AddActuatorProps {
  show: boolean;
  onClose: () => void;
  onAddedActuator?: (actuator: Actuator) => void;
}

const AddActuator: FunctionComponent<AddActuatorProps> = (
  props: AddActuatorProps
) => {
  const [designation, setDesignation] = useState("");
  const [type, setType] = useState(ActuatorType.BLINDS);
  const [state, setState] = useState(false);

  const add = () => {
    // fake API
    // Add fake ID
    const actuator = {
      id: v1(),
      designation,
      type,
      state,
    };
    // call onClose and onAddedActuator
    props.onClose();
    if (props.onAddedActuator) {
      props.onAddedActuator(actuator);
    }
  };

  return (
    <Dialog open={props.show} onClose={props.onClose}>
      <DialogTitle>Ajouter un actuateur</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Veuillez remplir les champs ci-dessous pour ajouter votre actuateur
        </DialogContentText>
        <Box marginY={2}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              placeholder="ex: volet roulant"
              label="Designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            />
            <FormControl>
              <InputLabel>Type</InputLabel>
              <Select
                fullWidth
                label="Type"
                value={type}
                onChange={(e) => setType(e.target.value as ActuatorType)}
              >
                <MenuItem value={ActuatorType.BLINDS}>Volet</MenuItem>
                <MenuItem value={ActuatorType.LIGHT}>Lumière</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Switch
                  value={state}
                  onChange={(e) => setState(e.target.checked)}
                />
              }
              label="État actuel"
            />
            <Button onClick={() => add()} disabled={!designation.length}>
              Ajouter
            </Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddActuator;

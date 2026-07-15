import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
} from "@mui/material";

import {
  updateInteraction,
  fetchInteractions,
} from "../features/interactionSlice";

function EditInteractionDialog({
  open,
  handleClose,
  interaction,
}) {
  const dispatch = useDispatch();

  const [form, setForm] = useState({});

  useEffect(() => {
    if (interaction) {
      setForm(interaction);
    }
  }, [interaction]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    await dispatch(
      updateInteraction({
        id: form.id,
        data: form,
      })
    );

    dispatch(fetchInteractions());

    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Edit Interaction</DialogTitle>

      <DialogContent>

        <Stack spacing={2} mt={1}>

          <TextField
            label="HCP Name"
            name="hcp_name"
            value={form.hcp_name || ""}
            onChange={handleChange}
          />

          <TextField
            type="date"
            name="interaction_date"
            value={form.interaction_date || ""}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Interaction Type"
            name="interaction_type"
            value={form.interaction_type || ""}
            onChange={handleChange}
          />

          <TextField
            label="Discussion"
            multiline
            rows={3}
            name="discussion"
            value={form.discussion || ""}
            onChange={handleChange}
          />

          <TextField
            label="Products"
            name="products"
            value={form.products || ""}
            onChange={handleChange}
          />

          <TextField
            label="Follow Up"
            name="follow_up"
            value={form.follow_up || ""}
            onChange={handleChange}
          />

          <TextField
            label="Sentiment"
            name="sentiment"
            value={form.sentiment || ""}
            onChange={handleChange}
          />

          <TextField
            label="Summary"
            multiline
            rows={2}
            name="summary"
            value={form.summary || ""}
            onChange={handleChange}
          />

        </Stack>

      </DialogContent>

      <DialogActions>

        <Button
          onClick={handleClose}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
        >
          Save
        </Button>

      </DialogActions>

    </Dialog>
  );
}

export default EditInteractionDialog;
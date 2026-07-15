import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  createInteraction,
  fetchInteractions,
} from "../features/interactionSlice";

import {
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  MenuItem,
  CircularProgress,
} from "@mui/material";

import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";

const TYPE_OPTIONS = [
  "Call",
  "Visit",
  "Email",
  "Conference",
  "Virtual Meeting",
];

const SENTIMENT_OPTIONS = [
  "Positive",
  "Neutral",
  "Negative",
];

function InteractionForm() {
  const dispatch = useDispatch();

  const [saving, setSaving] = useState(false);

  const emptyForm = {
    hcp_name: "",
    interaction_date: "",
    interaction_type: "",
    discussion: "",
    products: "",
    follow_up: "",
    sentiment: "",
    summary: "",
  };

  const [form, setForm] = useState(emptyForm);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!form.hcp_name.trim()) return;

    setSaving(true);

    try {
      await dispatch(createInteraction(form));

      dispatch(fetchInteractions());

      setForm(emptyForm);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        borderRadius: 4,
        height: "100%",
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center" mb={3}>
        <EditNoteRoundedIcon color="secondary" />

        <Typography variant="h5" fontWeight={600}>
          Log Interaction
        </Typography>
      </Stack>

      <Stack spacing={2.5}>

        <TextField
          label="HCP Name"
          name="hcp_name"
          value={form.hcp_name}
          onChange={handleChange}
          autoComplete="off"
          fullWidth
          size="small"
        />

        <Stack direction="row" spacing={2}>

          <TextField
            
            type="date"
            name="interaction_date"
            value={form.interaction_date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
            size="small"
          />

          <TextField
            select
            label="Interaction Type"
            name="interaction_type"
            value={form.interaction_type}
            onChange={handleChange}
            fullWidth
            size="small"
          >
            {TYPE_OPTIONS.map((option) => (
              <MenuItem
                key={option}
                value={option}
              >
                {option}
              </MenuItem>
            ))}
          </TextField>

        </Stack>

        <TextField
          label="Discussion"
          name="discussion"
          value={form.discussion}
          onChange={handleChange}
          multiline
          minRows={4}
          fullWidth
          size="small"
        />

        <TextField
          label="Products Discussed"
          name="products"
          value={form.products}
          onChange={handleChange}
          fullWidth
          size="small"
        />

        <Stack direction="row" spacing={2}>

          <TextField
            label="Follow Up"
            name="follow_up"
            value={form.follow_up}
            onChange={handleChange}
            fullWidth
            size="small"
          />

          <TextField
            select
            label="Sentiment"
            name="sentiment"
            value={form.sentiment}
            onChange={handleChange}
            fullWidth
            size="small"
          >
            {SENTIMENT_OPTIONS.map((option) => (
              <MenuItem
                key={option}
                value={option}
              >
                {option}
              </MenuItem>
            ))}
          </TextField>

        </Stack>

        <TextField
          label="Summary"
          name="summary"
          value={form.summary}
          onChange={handleChange}
          multiline
          minRows={3}
          fullWidth
          size="small"
        />

        <Button
          variant="contained"
          color="secondary"
          size="large"
          fullWidth
          disabled={saving}
          onClick={handleSubmit}
          sx={{
            mt: 1,
            py: 1.4,
            borderRadius: 2,
            fontWeight: 600,
            textTransform: "none",
          }}
          startIcon={
            saving ? (
              <CircularProgress
                size={18}
                color="inherit"
              />
            ) : null
          }
        >
          {saving ? "Saving..." : "Save Interaction"}
        </Button>

      </Stack>
    </Paper>
  );
}

export default InteractionForm;
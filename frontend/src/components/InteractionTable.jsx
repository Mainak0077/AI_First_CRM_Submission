import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchInteractions,
  updateInteraction,
  deleteInteraction,
} from "../features/interactionSlice";

import EditInteractionDialog from "./EditInteractionDialog";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button,
  Stack,
  Chip,
  Avatar,
  Box,
  IconButton,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";

function sentimentColor(sentiment) {
  const s = sentiment?.toLowerCase();
  if (s === "positive") return "success";
  if (s === "negative") return "error";
  if (s === "neutral") return "warning";
  return "default";
}

function InteractionTable() {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [selectedInteraction, setSelectedInteraction] = useState(null);

  const { list, loading } = useSelector((state) => state.interactions);

  useEffect(() => {
    dispatch(fetchInteractions());
  }, []);

  const handleEdit = (interaction) => {
    setSelectedInteraction(interaction);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedInteraction(null);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this interaction?"
    );
    if (!confirmDelete) return;
    await dispatch(deleteInteraction(id));
    dispatch(fetchInteractions());
  };

  return (
    <>
      <Paper sx={{ p: 2.5 }}>
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <GroupsRoundedIcon color="primary" />
          <Typography variant="h6">Previous Interactions</Typography>
        </Stack>

        {loading && (
          <Stack alignItems="center" py={5}>
            <CircularProgress size={28} color="secondary" />
          </Stack>
        )}

        {!loading && list.length === 0 && (
          <Box sx={{ textAlign: "center", py: 6, color: "text.secondary" }}>
            <GroupsRoundedIcon sx={{ fontSize: 36, mb: 1, opacity: 0.4 }} />
            <Typography variant="body2">
              No interactions logged yet. Use the form above to add your first one.
            </Typography>
          </Box>
        )}

        {!loading && list.length > 0 && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Doctor</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Sentiment</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {list.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{
                    "&:hover": { bgcolor: "#FAFBFC" },
                    "&:last-child td": { borderBottom: 0 },
                  }}
                >
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={1.2}>
                      <Avatar sx={{ width: 30, height: 30, bgcolor: "primary.main", fontSize: 13 }}>
                        {item.hcp_name?.[0]?.toUpperCase() || "?"}
                      </Avatar>
                      <Typography variant="body2" fontWeight={600}>
                        {item.hcp_name}
                      </Typography>
                    </Stack>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {item.interaction_date}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Chip size="small" label={item.interaction_type || "—"} variant="outlined" />
                  </TableCell>

                  <TableCell>
                    {item.sentiment ? (
                      <Chip size="small" label={item.sentiment} color={sentimentColor(item.sentiment)} />
                    ) : (
                      <Typography variant="body2" color="text.secondary">—</Typography>
                    )}
                  </TableCell>

                  <TableCell align="right">
                    <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                      <Tooltip title="Edit">
                        <IconButton size="small" onClick={() => handleEdit(item)}>
                          <EditRoundedIcon fontSize="small" color="action" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton size="small" onClick={() => handleDelete(item.id)}>
                          <DeleteRoundedIcon fontSize="small" color="error" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>

      <EditInteractionDialog
        open={open}
        handleClose={handleClose}
        interaction={selectedInteraction}
      />
    </>
  );
}

export default InteractionTable;
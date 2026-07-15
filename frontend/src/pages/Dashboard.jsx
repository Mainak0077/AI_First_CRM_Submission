import { Box, Container, Grid, Stack, Typography, Chip } from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

import InteractionForm from "../components/InteractionForm";
import AIChat from "../components/AIChat";
import InteractionTable from "../components/InteractionTable";
import StatsCards from "../components/StatsCards";

function Dashboard() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Box sx={{ bgcolor: "primary.main", color: "#fff", py: 4, mb: 4 }}>
        <Container maxWidth="xl">
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            spacing={1.5}
          >
            <Stack>
              <Typography variant="h3" sx={{ fontSize: { xs: 28, md: 34 } }}>
                AI First CRM
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.75 }}>
                Field interaction tracking, powered by your AI assistant
              </Typography>
            </Stack>
            <Chip
              icon={<AutoAwesomeRoundedIcon sx={{ color: "#fff !important" }} />}
              label="AI Assistant Online"
              sx={{
                bgcolor: "rgba(255,255,255,0.12)",
                color: "#fff",
                fontWeight: 600,
                px: 1,
              }}
            />
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ pb: 6 }}>
        <StatsCards />

        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, md: 5 }}>
            <InteractionForm />
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <AIChat />
          </Grid>
        </Grid>

        <InteractionTable />
      </Container>
    </Box>
  );
}

export default Dashboard;
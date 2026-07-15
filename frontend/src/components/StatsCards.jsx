import { useSelector } from "react-redux";
import { Grid, Paper, Stack, Typography, Avatar } from "@mui/material";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import SentimentSatisfiedAltRoundedIcon from "@mui/icons-material/SentimentSatisfiedAltRounded";
import EventRepeatRoundedIcon from "@mui/icons-material/EventRepeatRounded";

function StatCard({ label, value, icon, color }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        display: "flex",
        alignItems: "center",
        gap: 2,
        transition: "box-shadow .2s, transform .2s",
        "&:hover": {
          boxShadow: "0 8px 20px rgba(19,42,76,0.08)",
          transform: "translateY(-2px)",
        },
      }}
    >
      <Avatar sx={{ bgcolor: `${color}1A`, color: color, width: 48, height: 48 }}>
        {icon}
      </Avatar>
      <Stack>
        <Typography variant="caption" color="text.secondary" fontWeight={600}>
          {label}
        </Typography>
        <Typography variant="h5" fontFamily="'Sora', sans-serif" fontWeight={700}>
          {value}
        </Typography>
      </Stack>
    </Paper>
  );
}

function StatsCards() {
  const { list } = useSelector((state) => state.interactions);

  const totalHCP = new Set(list.map((i) => i.hcp_name)).size;
  const totalInteractions = list.length;
  const positiveSentiment = list.filter(
    (i) => i.sentiment?.toLowerCase() === "positive"
  ).length;
  const followUps = list.filter((i) => i.follow_up?.trim()).length;

  const stats = [
    { label: "Total HCPs", value: totalHCP, icon: <PeopleAltRoundedIcon />, color: "#132A4C" },
    { label: "Total Interactions", value: totalInteractions, icon: <ForumRoundedIcon />, color: "#0F9B8E" },
    { label: "Positive Sentiment", value: positiveSentiment, icon: <SentimentSatisfiedAltRoundedIcon />, color: "#1F9D66" },
    { label: "Follow-ups Due", value: followUps, icon: <EventRepeatRoundedIcon />, color: "#D98E04" },
  ];

  return (
    <Grid container spacing={2.5} sx={{ mb: 4 }}>
      {stats.map((s) => (
        <Grid key={s.label} size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard {...s} />
        </Grid>
      ))}
    </Grid>
  );
}

export default StatsCards;
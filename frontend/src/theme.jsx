import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#132A4C", light: "#2F4373", contrastText: "#fff" },
    secondary: { main: "#0F9B8E", contrastText: "#fff" },
    success: { main: "#1F9D66" },
    warning: { main: "#D98E04" },
    error: { main: "#D64545" },
    background: { default: "#F6F7F9", paper: "#FFFFFF" },
    text: { primary: "#12161C", secondary: "#5B6472" },
    divider: "#E3E6EC",
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: "'Inter', system-ui, sans-serif",
    h3: { fontFamily: "'Sora', sans-serif", fontWeight: 700, letterSpacing: "-0.5px" },
    h6: { fontFamily: "'Sora', sans-serif", fontWeight: 600 },
    subtitle2: { fontFamily: "'Sora', sans-serif", fontWeight: 600 },
    button: { fontWeight: 600, textTransform: "none" },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          border: "1px solid #E3E6EC",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 10 },
        contained: { boxShadow: "none" },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontFamily: "'Sora', sans-serif",
          fontWeight: 600,
          fontSize: 12,
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          color: "#5B6472",
          background: "#F6F7F9",
        },
      },
    },
    MuiChip: {
      styleOverrides: { root: { fontWeight: 600 } },
    },
  },
});

export default theme;
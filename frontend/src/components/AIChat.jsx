import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../features/chatSlice";

import {
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Box,
  Avatar,
  IconButton,
} from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

function AIChat() {
  const dispatch = useDispatch();
  const { messages, loading } = useSelector((state) => state.chat);
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    dispatch(sendMessage(text));
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Paper sx={{ height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <Box
        sx={{
          px: 3,
          py: 2,
          background: "linear-gradient(135deg, #132A4C 0%, #0F9B8E 130%)",
          color: "#fff",
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1.2}>
          <Avatar sx={{ bgcolor: "rgba(255,255,255,0.18)", width: 32, height: 32 }}>
            <AutoAwesomeRoundedIcon sx={{ fontSize: 18 }} />
          </Avatar>
          <Stack>
            <Typography variant="subtitle2" sx={{ color: "#fff", lineHeight: 1.2 }}>
              AI Assistant
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              Ask about HCPs, trends, or drafting follow-ups
            </Typography>
          </Stack>
        </Stack>
      </Box>

      <Stack
        spacing={1.5}
        sx={{
          flex: 1,
          height: 320,
          overflowY: "auto",
          p: 2.5,
          bgcolor: "#FBFBFC",
        }}
      >
        {messages.length === 0 && !loading && (
          <Box sx={{ m: "auto", textAlign: "center", color: "text.secondary" }}>
            <AutoAwesomeRoundedIcon sx={{ fontSize: 32, mb: 1, color: "secondary.main" }} />
            <Typography variant="body2">
              No messages yet — ask a question to get started.
            </Typography>
          </Box>
        )}

        {messages.map((msg, index) => {
          const isUser = msg.role === "user";
          return (
            <Stack
              key={index}
              direction="row"
              spacing={1}
              justifyContent={isUser ? "flex-end" : "flex-start"}
              alignItems="flex-end"
            >
              {!isUser && (
                <Avatar sx={{ width: 26, height: 26, bgcolor: "secondary.main" }}>
                  <AutoAwesomeRoundedIcon sx={{ fontSize: 14 }} />
                </Avatar>
              )}
              <Paper
                elevation={0}
                sx={{
                  p: 1.4,
                  px: 1.8,
                  maxWidth: "75%",
                  borderRadius: 3,
                  ...(isUser
                    ? { bgcolor: "primary.main", color: "#fff", borderBottomRightRadius: 4 }
                    : { bgcolor: "#fff", borderBottomLeftRadius: 4 }),
                }}
              >
                <Typography variant="body2">{msg.content}</Typography>
              </Paper>
              {isUser && (
                <Avatar sx={{ width: 26, height: 26, bgcolor: "#E3E6EC", color: "text.secondary" }}>
                  <PersonRoundedIcon sx={{ fontSize: 14 }} />
                </Avatar>
              )}
            </Stack>
          );
        })}

        {loading && (
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar sx={{ width: 26, height: 26, bgcolor: "secondary.main" }}>
              <AutoAwesomeRoundedIcon sx={{ fontSize: 14 }} />
            </Avatar>
            <Paper elevation={0} sx={{ p: 1.4, px: 2, borderRadius: 3, borderBottomLeftRadius: 4 }}>
              <Stack direction="row" spacing={0.5}>
                {[0, 1, 2].map((i) => (
                  <Box
                    key={i}
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      bgcolor: "secondary.main",
                      animation: "pulse 1.2s infinite",
                      animationDelay: `${i * 0.2}s`,
                      "@keyframes pulse": {
                        "0%, 80%, 100%": { opacity: 0.3 },
                        "40%": { opacity: 1 },
                      },
                    }}
                  />
                ))}
              </Stack>
            </Paper>
          </Stack>
        )}
      </Stack>

      <Stack direction="row" spacing={1} sx={{ p: 2 }}>
        <TextField
          fullWidth
          size="small"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask AI..."
        />
        <IconButton
          color="secondary"
          onClick={handleSend}
          sx={{ bgcolor: "secondary.main", color: "#fff", "&:hover": { bgcolor: "#0C8377" } }}
        >
          <SendRoundedIcon fontSize="small" />
        </IconButton>
      </Stack>
    </Paper>
  );
}

export default AIChat;
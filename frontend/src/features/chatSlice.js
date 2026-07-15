import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (message) => {
    const response = await api.post("/agent/chat", {
      message,
    });

    return response.data.response;
  }
);

const chatSlice = createSlice({
  name: "chat",

  initialState: {
    messages: [],
    loading: false,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
      })

      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;

        state.messages.push({
          role: "assistant",
          content: action.payload,
        });
      })

      .addCase(sendMessage.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default chatSlice.reducer;
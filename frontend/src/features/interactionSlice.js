import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";

export const fetchInteractions = createAsyncThunk(
  "interactions/fetchAll",
  async () => {
    const response = await api.get("/interactions/");
    return response.data;
  }
);

export const createInteraction = createAsyncThunk(
  "interactions/create",
  async (data) => {
    const response = await api.post("/interactions/", data);
    return response.data;
  }
);

export const updateInteraction = createAsyncThunk(
  "interactions/update",
  async ({ id, data }) => {
    const response = await api.put(`/interactions/${id}`, data);
    return response.data;
  }
);

export const deleteInteraction = createAsyncThunk(
  "interactions/delete",
  async (id) => {
    await api.delete(`/interactions/${id}`);
    return id;
  }
);

const interactionSlice = createSlice({
  name: "interactions",

  initialState: {
    list: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchInteractions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInteractions.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchInteractions.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createInteraction.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })
      .addCase(updateInteraction.fulfilled, (state, action) => {
        state.list = state.list.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      })
      .addCase(deleteInteraction.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (item) => item.id !== action.payload
        );
      });
  },
});

export default interactionSlice.reducer;
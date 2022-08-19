import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// a slice is logic containing reducers and actions

const initialState = {
  items: [],
  status: null,
  error: null,
};

// action creator
export const productsFetch = createAsyncThunk(
  "products/productsFetch",
  async ({ rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/products");
      //throw error if no data in response
      return response?.data;
    } catch (error) {
      return rejectWithValue("An error occurred");
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  // reducers generate action creators and handle state, extraReducer does not generate action creators, only handles action types
  reducers: {},
  extraReducers: {
    [productsFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [productsFetch.fulfilled]: (state, action) => {
      state.status = "success";
      state.items = action.payload;
    },
    [productsFetch.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});

export default productsSlice.reducer;

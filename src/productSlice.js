import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: null,
  isLoading: false,
};

export const addProducts = createAsyncThunk(
  "products/addproducts",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios("https://dummyjson.com/products");
      return data.products;
    } catch (error) {
      return thunkAPI.rejectWithValue("products doesn't exist");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProducts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.products = payload;
      })
      .addCase(addProducts.rejected, (state, { payload }) => {
        state.isLoading = false;
        console.log(payload);
      });
  },
});

export default productSlice.reducer;

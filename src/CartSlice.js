import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartProducts: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
});

export default cartSlice.reducer;

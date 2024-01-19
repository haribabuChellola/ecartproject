import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartProducts: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log(action.payload);
      let index = state.cartProducts.findIndex((e) => {
        return e.id === action.payload.id;
      });

      if (index !== -1) {
        state.cartProducts[index].count += 1;
      } else {
        state.cartProducts = [...state.cartProducts, action.payload];
      }
    },
    increase: (state, action) => {
      let index = state.cartProducts.findIndex((e) => {
        return e.id === action.payload.id;
      });
      state.cartProducts[index].count += 1;
    },
  },
});

export const { addToCart, increase } = cartSlice.actions;

export default cartSlice.reducer;

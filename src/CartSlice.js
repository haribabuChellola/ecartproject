import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartItems = [...state.cartItems, action.payload];
    },
    increase: (state, action) => {
      const index = state.cartItems.findIndex((e) => {
        return e.id === action.payload;
      });
      state.cartItems[index].count += 1;
    },
    decrease: (state, action) => {
      const index = state.cartItems.findIndex((e) => {
        return e.id === action.payload;
      });

      state.cartItems[index].count -= 1;
    },
    remove: (state, action) => {
      let x = state.cartItems.filter((e) => {
        return e.id !== action.payload;
      });
      state.cartItems = x;
    },
    clear: (state) => {
      return {
        cartItems: [],
      };
    },
  },
});
export const { addToCart, increase, decrease, remove, clear } =
  cartSlice.actions;
export default cartSlice.reducer;

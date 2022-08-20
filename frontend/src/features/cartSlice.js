import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  //if items exist in local storage then include them in state
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      // check whether a product exists in cart items already
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.info(
          `Another ${state.cartItems[itemIndex].name} has been added to cart`,
          {
            position: "bottom-left",
          }
        );
        // state.cartItems.findIndex((item) => item.id === action.payload.id);
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
        toast.success(`${action.payload.name} added to cart`, {
          position: "bottom-left",
        });
        // //action.payload is the product
        // state.cartItems.push(action.payload);
      }
      //add item to local storage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    // update cart item state
    removeFromCart(state, action) {
      const nextCartItems = state.cartItems.filter(
        // return items that are not equal, will not be included in array
        (cartItem) => cartItem.id !== action.payload.id
      );
      state.cartItems = nextCartItems;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.error(`${action.payload.name} removed from cart`, {
        position: "bottom-left",
      });
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;

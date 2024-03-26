// src/redux/slices/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        sidebarVisible: false,
    },
    reducers: {
        addToCart: (state, action) => {
            const existingIndex = state.items.findIndex(
                item => item.id === action.payload.id && item.size === action.payload.size
            );

            if (existingIndex !== -1) {
                state.items[existingIndex].quantity += action.payload.quantity;
            } else {
                console.log("ADDING TO CART")
                state.items.push(action.payload);
            }
        },

        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        toggleCartSidebar: (state) => {
            state.sidebarVisible = !state.sidebarVisible;
            console.log("CLICKEDF")
        },
    },
});

export const { addToCart, removeFromCart, toggleCartSidebar } = cartSlice.actions;

export default cartSlice.reducer;

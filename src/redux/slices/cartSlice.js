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
        increaseQuantity: (state, action) => {
            const existingItem = state.items.find(item => item.id === action.payload);
            if (existingItem) {
                existingItem.quantity += 1;
            }
        },
        decreaseQuantity: (state, action) => {
            const existingItem = state.items.find(item => item.id === action.payload);
            if (existingItem && existingItem.quantity > 1) {
                existingItem.quantity -= 1;
            }
        },
    },
});

export const { addToCart, removeFromCart, toggleCartSidebar, increaseQuantity, decreaseQuantity } = cartSlice.actions;

export default cartSlice.reducer;

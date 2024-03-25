import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';

export const store = configureStore({
    reducer: {
        // Define a top-level state field named `cart`, handled by `cartReducer`
        cart: cartReducer,
        // You can add more reducers here
    },
});


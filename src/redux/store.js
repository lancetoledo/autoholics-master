import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice'; // Import the authSlice reducer

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart', 'auth'], // You can choose which slices to persist
};

const persistedReducer = persistReducer(persistConfig, cartReducer, authReducer);

export const store = configureStore({
    reducer: {
        cart: persistedReducer,
        auth: authReducer,
        // other state slices can go here
    },
});

export const persistor = persistStore(store);

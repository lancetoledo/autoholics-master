import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import cartReducer from './slices/cartSlice';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'], // You can choose which slices to persist
};

const persistedReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
    reducer: {
        cart: persistedReducer,
        // other state slices can go here
    },
});

export const persistor = persistStore(store);

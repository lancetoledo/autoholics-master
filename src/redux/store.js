import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';

// Combine reducers
const rootReducer = combineReducers({
    cart: cartReducer,
    auth: authReducer,
    // ... other reducers
});

// Persist config
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart', 'auth'], // Names of reducers to persist
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store configuration
export const store = configureStore({
    reducer: persistedReducer,
});

// Persistor
export const persistor = persistStore(store);

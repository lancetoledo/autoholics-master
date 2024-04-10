// src/redux/slices/shopSlice.js
import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import db from '../../utils/firebase';

// This is correct; fetchShopItems is being exported immediately.
export const fetchShopItems = createAsyncThunk(
    'shop/fetchShopItems',
    async () => {
        const snapshot = await getDocs(collection(db, 'shop'));
        return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    }
);

const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        items: [],
        status: 'idle', // Possible values: 'idle', 'loading', 'succeeded', 'failed'
        error: null
    },
    reducers: {
        // Define any reducers you need for modifying the shop state here.
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchShopItems.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchShopItems.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload; // Populate the items array with fetched data.
            })
            .addCase(fetchShopItems.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

// This selector is correctly defined and exported.
export const selectProductById = createSelector(
    [state => state.shop.items, (state, productId) => productId],
    (items, productId) => items.find(item => item.id === productId)
);

export default shopSlice.reducer;

// Correction: You do NOT need to export fetchShopItems here again since it's already exported above.
// Just export selectProductById if it's the only additional export needed.
// export { selectProductById };

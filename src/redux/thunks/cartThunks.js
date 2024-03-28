import { doc, updateDoc, arrayUnion, getDoc, setDoc } from 'firebase/firestore';
import db from '../../utils/firebase';
import { setCartItems } from '../slices/cartSlice';

// Thunk for fetching or initializing the user's cart
export const fetchOrInitializeCart = (userId) => async (dispatch) => {
    const cartRef = doc(db, 'carts', userId);
    const cartSnap = await getDoc(cartRef);

    if (cartSnap.exists()) {
        // If the cart exists, dispatch an action to set the cart items in the Redux store
        dispatch(setCartItems(cartSnap.data().items));
    } else {
        // If the cart does not exist, initialize it with an empty array
        await setDoc(cartRef, { items: [] });
        dispatch(setCartItems([]));
    }
};

// New thunk for adding an item to the cart
export const addToCartAsync = (userId, newItem) => async (dispatch) => {
    try {
        const cartRef = doc(db, 'carts', userId);
        const cartSnap = await getDoc(cartRef);

        if (!cartSnap.exists()) {
            // If the cart doesn't exist, initialize it with the new item
            await setDoc(cartRef, { items: [newItem] });
        } else {
            // If the cart exists, add the new item to it
            await updateDoc(cartRef, {
                items: arrayUnion(newItem)
            });
        }

        // Fetch the updated cart items from Firestore and update the Redux store
        dispatch(fetchOrInitializeCart(userId));
    } catch (error) {
        console.error("Error adding item to cart: ", error);
    }
};

// Thunk for removing an item from the user's cart in Firestore
export const removeFromCartAsync = (userId, itemToRemove) => async (dispatch) => {
    const cartRef = doc(db, 'carts', userId);

    try {
        const cartSnap = await getDoc(cartRef);
        if (cartSnap.exists()) {
            let cartData = cartSnap.data();
            console.log(`Comparing:`, cartData.items[0].id, itemToRemove.id, cartData.items[0].size, itemToRemove.size);
            let updatedItems = cartData.items.filter(item =>
                !(item.id === itemToRemove.id && item.size === itemToRemove.size)
            );
            console.log(updatedItems)
            // Update the document in Firestore
            await updateDoc(cartRef, { items: updatedItems });

            // Dispatch to update items in the Redux store, if necessary
            dispatch(fetchOrInitializeCart(userId));
        } else {
            console.error("Cart does not exist for user:", userId);
        }
    } catch (error) {
        console.error("Error removing item from cart:", error);
    }
};

export const increaseCartItemAsync = (userId, itemToUpdate) => async (dispatch) => {
    const cartRef = doc(db, 'carts', userId);

    try {
        const cartSnap = await getDoc(cartRef);
        if (cartSnap.exists()) {
            const cartData = cartSnap.data();
            // Debugging: Log current items and the item to update
            console.log("Current items in cart:", cartData.items);
            console.log("Item to update:", itemToUpdate);

            const updatedItems = cartData.items.map(item => {
                // Debugging: Log each comparison
                console.log(`Comparing:`, item.id, itemToUpdate.id, item.size, itemToUpdate.size);
                if (item.id === itemToUpdate.id && item.size === itemToUpdate.size) {
                    console.log("Match found, updating quantity:", item.quantity + 1);
                    return { ...item, quantity: item.quantity + 1 }; // Increase quantity
                } else {
                    return item;
                }
            });

            // Update Firestore only if there's a change
            await updateDoc(cartRef, { items: updatedItems });
            console.log('Items after attempted update:', updatedItems);

            // Re-fetch the cart to update Redux state
            dispatch(fetchOrInitializeCart(userId));
        } else {
            console.log("Cart does not exist for user:", userId);
        }
    } catch (error) {
        console.error("Error increasing item quantity in cart:", error);
    }
};

export const decreaseCartItemAsync = (userId, itemToUpdate) => async (dispatch) => {
    const cartRef = doc(db, 'carts', userId);

    try {
        const cartSnap = await getDoc(cartRef);
        if (cartSnap.exists()) {
            const cartData = cartSnap.data();
            // Debugging: Log current items and the item to update
            console.log("Current items in cart:", cartData.items);
            console.log("Item to update:", itemToUpdate);

            const updatedItems = cartData.items.map(item => {
                // Debugging: Log each comparison
                console.log(`Comparing:`, item.id, itemToUpdate.id, item.size, itemToUpdate.size);
                if (item.id === itemToUpdate.id && item.size === itemToUpdate.size) {
                    console.log("Match found, updating quantity:", item.quantity - 1);
                    return { ...item, quantity: item.quantity - 1 }; // Decrease quantity
                } else {
                    return item;
                }
            });

            // Update Firestore only if there's a change
            await updateDoc(cartRef, { items: updatedItems });
            console.log('Items after attempted update:', updatedItems);

            // Re-fetch the cart to update Redux state
            dispatch(fetchOrInitializeCart(userId));
        } else {
            console.log("Cart does not exist for user:", userId);
        }
    } catch (error) {
        console.error("Error increasing item quantity in cart:", error);
    }
};
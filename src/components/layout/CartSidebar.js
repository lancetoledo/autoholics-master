// Place this code in the component where you want to render the CartSidebar.
import React from 'react';
import { useSelector } from 'react-redux';

const CartSidebar = () => {
    // Access the cart items and sidebar visibility from Redux store
    const cartItems = useSelector((state) => state.cart.items);
    const isSidebarVisible = useSelector((state) => state.cart.sidebarVisible);

    return (
        // Conditional rendering based on the sidebar visibility state
        isSidebarVisible && (
            <div className={`cart-sidebar ${isSidebarVisible ? 'cart-sidebar-visible' : ''}`}>
                <h2>Cart Items</h2>
                {cartItems.map((item, index) => (
                    <div key={index}>
                        <p>{item.value}</p>
                        {/* Quantity can be a property of the item if you're tracking it */}
                        <p>Quantity: {item.quantity || 1}</p>
                    </div>
                ))}
            </div>
        )
    );
};

export default CartSidebar;

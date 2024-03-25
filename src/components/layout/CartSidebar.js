// src/components/layout/CartSidebar.js
import React from 'react';
import { useSelector } from 'react-redux';

const CartSidebar = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const isSidebarVisible = useSelector((state) => state.cart.sidebarVisible);

    return (
        <div className={`cart-sidebar ${isSidebarVisible ? 'cart-sidebar-visible' : ''}`}>
            <h2>Cart Items</h2>
            {cartItems.map((item, index) => (
                <div key={index}>
                    <p>{item.value}</p>
                    <p>Quantity: {item.quantity || 1}</p> {/* Update according to your item structure */}
                </div>
            ))}
        </div>
    );
};

export default CartSidebar;

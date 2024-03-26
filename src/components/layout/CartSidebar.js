// CartSidebar.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, toggleCartSidebar, increaseQuantity, decreaseQuantity } from '../../redux/slices/cartSlice';
import { AiOutlineClose } from 'react-icons/ai'; // Import the icon
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";

const CartSidebar = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const isSidebarVisible = useSelector((state) => state.cart.sidebarVisible);
    const dispatch = useDispatch(); // Hook to dispatch actions

    // Function to handle closing the sidebar
    const handleCloseSidebar = () => {
        dispatch(toggleCartSidebar()); // Dispatch the action to toggle the visibility
    };

    // Function to handle removing an item from the cart
    const handleRemoveFromCart = (itemId) => {
        dispatch(removeFromCart(itemId));
    };

    // Calculate total price
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleIncreaseCount = (itemId) => {
        console.log("INCREASING")
        dispatch(increaseQuantity(itemId));
    }

    const handleDecreaseCount = (itemId) => {
        console.log("DECREASING")
        dispatch(decreaseQuantity(itemId));
    }

    return (
        <div className={`cart-sidebar ${isSidebarVisible ? 'cart-sidebar-visible' : ''}`}>
            <div className="cart-header">
                <h2>Cart Items</h2>
                <AiOutlineClose className="close-icon" onClick={handleCloseSidebar} />
            </div>
            <div className="cart-items">
                {cartItems.map((item, index) => (
                    <div key={index} className="cart-item">
                        <img src={item.image} alt={item.name} className="cart-item-image" />
                        <div className="cart-item-details">
                            <p>{item.name}</p>
                            <p id='cart-price'>Price: ${item.price.toFixed(2)}</p>
                            <p>Size: {item.size}</p>
                            <div className='cart-item-btns'>
                                <div className='cart-quantity-control'>
                                    <div className='cart-switch'>
                                        <AiOutlineMinus className='cart-switch-ctrl' onClick={() => handleDecreaseCount(item.id)} />
                                    </div>
                                    <div id='cart-qtn'>{item.quantity}</div>
                                    <div className='cart-switch'>
                                        <AiOutlinePlus className='cart-switch-ctrl' onClick={() => handleIncreaseCount(item.id)} />
                                    </div>
                                </div>
                                <p className='remove-item' onClick={() => handleRemoveFromCart(item.id)}>Remove</p>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
            <button className="checkout-button">
                Checkout - Total: ${totalPrice.toFixed(2)}
            </button>
        </div>
    );
};

export default CartSidebar;

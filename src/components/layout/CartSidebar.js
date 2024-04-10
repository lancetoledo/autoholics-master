import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, toggleCartSidebar } from '../../redux/slices/cartSlice';
import { increaseCartItemAsync, decreaseCartItemAsync, removeFromCartAsync } from '../../redux/thunks/cartThunks'; // Import the new thunks
import { AiOutlineClose } from 'react-icons/ai'; // Import the icon
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";

const CartSidebar = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const isSidebarVisible = useSelector((state) => state.cart.sidebarVisible);
    const dispatch = useDispatch(); // Hook to dispatch actions
    const sidebarRef = useRef(); // Create a ref
    const { user } = useSelector((state) => state.auth || {}); // Add a fallback to an empty object

    // Function to handle closing the sidebar
    const handleCloseSidebar = () => {
        dispatch(toggleCartSidebar()); // Dispatch the action to toggle the visibility
    };

    // Function to handle removing an item from the cart
    const handleRemoveFromCart = (item) => {
        dispatch(removeFromCartAsync(user.uid, item));
    };

    // Calculate total price
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleIncreaseCount = (item) => {
        console.log("INCREASING")
        dispatch(increaseCartItemAsync(user.uid, item));
    }

    const handleDecreaseCount = (item) => {
        console.log("DECREASING")
        dispatch(decreaseCartItemAsync(user.uid, item));
    }

    // Step 2: Setup an event listener to detect clicks outside of the CartSidebar
    useEffect(() => {
        function handleClickOutside(event) {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isSidebarVisible) {
                dispatch(toggleCartSidebar()); // Step 3: Toggle Sidebar
            }
        }
        // Add the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isSidebarVisible, dispatch]);

    return (
        <div ref={sidebarRef} className={`cart-sidebar ${isSidebarVisible ? 'cart-sidebar-visible' : ''}`}>
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
                                        <AiOutlineMinus className='cart-switch-ctrl' onClick={() => handleDecreaseCount(item)} />
                                    </div>
                                    <div id='cart-qtn'>{item.quantity}</div>
                                    <div className='cart-switch'>
                                        <AiOutlinePlus className='cart-switch-ctrl' onClick={() => handleIncreaseCount(item)} />
                                    </div>
                                </div>
                                <p className='remove-item' onClick={() => handleRemoveFromCart(item)}>Remove</p>
                            </div>

                        </div>
                    </div>
                ))}
            </div>

            <Link to={`/checkouts`} className='logo_div' style={{ textDecoration: 'none' }} onClick={handleCloseSidebar}>
            <button className="checkout-button">
                Checkout - Total: ${totalPrice.toFixed(2)}
            </button>
            </Link>
        </div>
    );
};

export default CartSidebar;

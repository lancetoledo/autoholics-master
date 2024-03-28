import React from 'react';
import logo from '../../images/autoholicsLogo.png';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import toast, { Toaster } from 'react-hot-toast';
import * as Scroll from 'react-scroll';
import { IoBagHandleOutline } from 'react-icons/io5';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { toggleCartSidebar, clearCart } from '../../redux/slices/cartSlice'; // Import the action creator
import { fetchOrInitializeCart } from '../../redux/thunks/cartThunks';


const CheckOutHeader = ({ click, setClick, }) => {
    // Redux States:
    const dispatch = useDispatch(); // Hook to dispatch actions
    const { user } = useSelector((state) => state.auth || {}); // Add a fallback to an empty object
    const cartCount = useSelector((state) => state.cart.items.length); // Get the number of items in the cart
    const cartItems = useSelector((state) => state.cart.items);

    const navigate = useNavigate();
    const location = useLocation();
    const ScrollLink = Scroll.Link;




    const redirectToHomeAndScroll = (section) => {
        if (location.pathname !== '/') {
            navigate('/');
        }
        if (setClick) {
            setClick(section);
        }
    };

    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
                containerClassName="toast-container"
            />
            <div className='checkout-header'>
                <div className='checkout-frame'>
                    <div className='checkout-cart-icon' >
                        <IoBagHandleOutline className='cart' />
                    </div>
                    <div className='checkout-nav'>
                        <ScrollLink activeClass='active' className='checkout-logo' to='hero' spy={true} smooth={true} offset={50} duration={500} onClick={() => redirectToHomeAndScroll('hero')}>
                            <img src={logo} alt='Autoholics' />
                        </ScrollLink>
                    </div>
                    <div className='cart-icon' >

                    </div>
                </div>
            </div>
        </>
    );
};

export default CheckOutHeader;
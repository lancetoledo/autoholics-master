import React from 'react';
import logo from '../../images/autoholicsLogo.png';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import toast, { Toaster } from 'react-hot-toast';
import * as Scroll from 'react-scroll';
import { AiOutlineUser } from 'react-icons/ai';
import { IoBagHandleOutline } from 'react-icons/io5';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { toggleCartSidebar } from '../../redux/slices/cartSlice'; // Import the action creator
import { logout } from '../../redux/slices/authSlice'; // Import the logout action

const Header = ({ click, setClick, }) => {
    const [scrollNav, setScrollNav] = useState(false);
    // Redux States:
    const dispatch = useDispatch(); // Hook to dispatch actions
    const { user } = useSelector((state) => state.auth || {}); // Add a fallback to an empty object
    const cartCount = useSelector((state) => state.cart.items.length); // Get the number of items in the cart
    const cartItems = useSelector((state) => state.cart.items);
    const isSidebarVisible = useSelector((state) => state.cart.sidebarVisible);

    let ScrollLink = Scroll.Link;

    // Logout Function
    const handleLogout = () => {
        dispatch(logout());
        // Optionally, navigate to a different route upon logout
        // navigate('/signin');
    };



    // UseEffect to scroll user on Header items.
    useEffect(() => {
        const changeNav = () => {
            if (window.scrollY >= 80) {
                setScrollNav(true);
            } else {
                setScrollNav(false);
            }
        };
        window.addEventListener('scroll', changeNav);
        return () => window.removeEventListener('scroll', changeNav); // Cleanup
    }, []);

    const handleStatus = (status) => {
        setClick(status);
    };

    const clearActive = () => {
        setClick(false);
    };

    // Use the dispatch function to toggle the cart sidebar
    const handleToggleCartSidebar = () => {
        dispatch(toggleCartSidebar());
    };

    return (
        <>
            {/* <Toaster
                position="top-center"
                reverseOrder={false}
                containerClassName="toast"
            /> */}
            <div className='header' style={{ background: scrollNav ? '#010606' : 'transparent' }}>
                <div className='nav'>
                    <ScrollLink activeClass='active' className='logo' to='hero' spy={true} smooth={true} offset={50} duration={500} onClick={() => clearActive()}>
                        <img src={logo} alt='Autoholics' />
                    </ScrollLink>
                    <div className='nav_menu'>
                        <ScrollLink className='nav_item' activeClass="active" to="about" spy={true} smooth={true} offset={50} duration={500} onClick={() => handleStatus('about')}><p className={click === 'about' ? 'nav_item activate' : 'nav_item'}>About Us</p></ScrollLink>
                        <ScrollLink className='nav_item' activeClass="active" to="services" spy={true} smooth={true} offset={50} duration={500} onClick={() => handleStatus('services')}><p className={click === 'services' ? 'nav_item activate' : 'nav_item'}>Services</p></ScrollLink>
                        <ScrollLink className='nav_item' activeClass="active" to="discover" spy={true} smooth={true} offset={50} duration={500} onClick={() => handleStatus('contact')}><p className={click === 'contact' ? 'nav_item activate' : 'nav_item'}>Contact Us</p></ScrollLink>
                        <Link className='nav_item' to="shop" style={{ textDecoration: 'none', color: 'white' }}>
                            <p className='nav_item' >Shop</p>
                        </Link>
                        {/* <ScrollLink activeClass="active" to="shop" spy={true} smooth={true} offset={50} duration={500} onClick={() => handleStatus('shop')}><p className={'nav_item'}>Shop</p></ScrollLink> */}
                    </div>
                    <div className='user_controls'>
                        {user ? <p className='user'>{user?.displayName}</p> : ''}
                        {!user?.displayName ? '' : <AiOutlineUser className='profile_icon' />}

                        {!user?.displayName ? (
                            ''
                        ) : (
                            <div className='cart-icon' onClick={handleToggleCartSidebar}>
                                {cartCount > 0 && (
                                    <span id='cart-count' className='cart-count'>
                                        {cartCount}
                                    </span>
                                )}
                                <IoBagHandleOutline className='cart' />
                            </div>
                        )}
                        {user ? (
                            <div className='btn' id='nav_btn' onClick={() => handleLogout()}>
                                Log Out
                            </div>
                        ) : (
                            <Link className='btn' id='nav_btn' to='signin' style={{ textDecoration: 'none' }}>
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
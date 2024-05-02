import React from 'react';
import logo from '../../images/autoholicsLogo.png';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import toast, { Toaster } from 'react-hot-toast';
import * as Scroll from 'react-scroll';
import { AiOutlineUser } from 'react-icons/ai';
import { IoBagHandleOutline } from 'react-icons/io5';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { toggleCartSidebar, clearCart } from '../../redux/slices/cartSlice'; // Import the action creator
import { logout } from '../../redux/slices/authSlice'; // Import the logout action
import { fetchOrInitializeCart , clearCartAsync} from '../../redux/thunks/cartThunks';


const Header = ({ click, setClick, }) => {
    const [scrollNav, setScrollNav] = useState(false);
    // Redux States:
    const dispatch = useDispatch(); // Hook to dispatch actions
    const { user } = useSelector((state) => state.auth || {}); // Add a fallback to an empty object
    const cartCount = useSelector((state) => state.cart.items.length); // Get the number of items in the cart
    const cartItems = useSelector((state) => state.cart.items);
    const isSidebarVisible = useSelector((state) => state.cart.sidebarVisible);
    const navigate = useNavigate();
    const location = useLocation();
    const ScrollLink = Scroll.Link;


    // Logout Function
    const handleLogout = () => {
        dispatch(logout());
        // Optionally, navigate to a different route upon logout
        // navigate('/signin');
        // Provide a message to let users know they logged out
        // toast.success('Successfully logged out!', {
        //     duration: 2000
        // });
    };

    const redirectToHomeAndScroll = (section) => {
        if (location.pathname !== '/') {
            navigate('/');
        }
        if (setClick) {
            setClick(section);
        }
    };

    useEffect(() => {
        if (user) {
            dispatch(fetchOrInitializeCart(user.uid));
        }
    }, [user, dispatch]);


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


    const clearActive = () => {
        setClick(false);
    };

    // Use the dispatch function to toggle the cart sidebar
    const handleToggleCartSidebar = () => {
        dispatch(toggleCartSidebar());
    };

    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
                containerClassName="toast-container"
            />
            <div className='header' style={{ background: scrollNav ? '#010606' : 'transparent' }}>
                <div className='nav'>
                    <ScrollLink activeClass='active' className='logo' to='hero' spy={true} smooth={true} offset={50} duration={500} onClick={() => redirectToHomeAndScroll('hero')}>
                        <img src={logo} alt='Autoholics' />
                    </ScrollLink>
                    <div className='nav_menu'>
                        {/* Update ScrollLink with new onClick function */}
                        <ScrollLink className='nav_item' activeClass="active" to="about" spy={true} smooth={true} offset={50} duration={500} onClick={() => redirectToHomeAndScroll('about')}>About Us</ScrollLink>
                        <ScrollLink className='nav_item' activeClass="active" to="services" spy={true} smooth={true} offset={50} duration={500} onClick={() => redirectToHomeAndScroll('services')}>Services</ScrollLink>
                        <ScrollLink className='nav_item' activeClass="active" to="discover" spy={true} smooth={true} offset={50} duration={500} onClick={() => redirectToHomeAndScroll('contact')}>Contact Us</ScrollLink>
                        <Link className='nav_item' to="/shop" style={{ textDecoration: 'none', color: 'white' }}>Shop</Link>
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
                            <Link className='btn' id='nav_btn' to='/signin' style={{ textDecoration: 'none' }}>
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
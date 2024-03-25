import React from 'react';
import logo from '../../images/autoholicsLogo.png';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import db from '../../utils/firebase';
import toast, { Toaster } from 'react-hot-toast';
import * as Scroll from 'react-scroll';
import { AiOutlineUser } from 'react-icons/ai';
import { IoBagHandleOutline } from 'react-icons/io5';

const ShopHeader = ({ click, setClick, cart, toggleCartSidebar }) => {
    const [isAuthUser, setAuthUser] = useState(false);
    const [user, setUser] = useState('');
    const [scrollNav, setScrollNav] = useState(false);
    const [isUser, setIsUser] = useState(false);

    let ScrollLink = Scroll.Link;

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user && isUser === false) {
            const uid = user.uid;
            console.log('setting user');
            setUser(user);
            setIsUser(true);
        } else {
            // User is signed out
            // ...
            console.log("User is signed in", user)
        }
    });

    const changeNav = () => {
        if (window.scrollY >= 80) {
            setScrollNav(true);
        } else {
            setScrollNav(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', changeNav);
    }, []);

    const handleStatus = (status) => {
        setClick(status);
    };

    const clearActive = () => {
        setClick(false);
    };

    const logout = async () => {
        console.log('HII');
        await signOut(auth)
            .then(() => {
                // Sign-out successful.
            })
            .catch((error) => {
                // An error happened.
                console.log(error.message);
            });
        // toast.success("You logged out!")
        setUser('');
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
                    <div className='shop_nav_menu'>
                        <p className='shop_nav_item'>About Us</p>
                        <p className='shop_nav_item'>Services</p>
                        <p className='shop_nav_item'>Contact Us</p>
                        <p className='shop_nav_item'>Shop</p>
                    </div>
                    <div className='user_controls'>
                        {user ? <p className='user'>{user?.displayName}</p> : ''}
                        {!user?.displayName ? '' : <AiOutlineUser className='profile_icon' />}

                        {!user?.displayName ? (
                            ''
                        ) : (
                            <div className='cart-icon' onClick={toggleCartSidebar}>
                                {cart.length > 0 && (
                                    <span id='cart-count' className='cart-count'>
                                        {cart.length}
                                    </span>
                                )}
                                <IoBagHandleOutline className='cart' />
                            </div>
                        )}
                        {user ? (
                            <div className='btn' id='nav_btn' onClick={() => logout()}>
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

export default ShopHeader;
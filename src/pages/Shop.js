import React, { useState, useEffect } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { collection, onSnapshot } from 'firebase/firestore';
import db from '../utils/firebase';
import Header from '../components/layout/Header';
import Item from '../components/shop/Item';
import Category from '../components/shop/Category';
import CartSidebar from '../components/layout/CartSidebar';

import { useDispatch, useSelector } from 'react-redux';
import { fetchShopItems } from '../redux/slices/shopSlice';



const Shop = () => {
    // Initialize dispatch to dispatch actions
    const dispatch = useDispatch();
    const shopItems = useSelector(state => state.shop.items); // Get the items from the Redux store
    const shopStatus = useSelector(state => state.shop.status); // Get the status to handle loading state
    // Local state for managing UI elements like dropdowns
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Alphabetically, A-Z');
    const [sortedItems, setSortedItems] = useState([]); // State for sorted items

    // Cart Functionality
    const [cart, setCart] = useState([])
    const [cartSidebarVisible, setCartSidebarVisible] = useState(false); // New state for cart sidebar visibility

    // Add to Cart Function
    const addToCart = (item) => {
        setCart([...cart, item]);
        console.log(cart, "the cart")
    }

    // Function to toggle the dropdown
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    // Function to handle option selection and sort items
    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        toggleDropdown();
        // Optional: dispatch a sorting action here or sort locally
    };

    // Function to toggle cart sidebar
    const toggleCartSidebar = () => {
        setCartSidebarVisible(!cartSidebarVisible);
    };

    // Function to handle sorting items based on the selected option
    useEffect(() => {
        let sortedData = [...shopItems]; // Create a copy of the shop items
        if (selectedOption === 'Price, low to high') {
            sortedData.sort((a, b) => a.price - b.price);
        } else if (selectedOption === 'Price, high to low') {
            sortedData.sort((a, b) => b.price - a.price);
        } else if (selectedOption === 'Alphabetically, A-Z') {
            sortedData.sort((a, b) => a.value.localeCompare(b.value));
        } else if (selectedOption === 'Alphabetically, Z-A') {
            sortedData.sort((a, b) => b.value.localeCompare(a.value));
        }
        setSortedItems(sortedData); // Set the sorted items to state
    }, [selectedOption, shopItems]); // Re-run the effect when selectedOption or shopItems changes

    // Fetch items when component mounts
    useEffect(() => {
        if (shopStatus === 'idle') {
            dispatch(fetchShopItems());
        }
    }, [dispatch, shopStatus]);

    let items = [
        {
            "id": 0,
            "value": "Autoholics T-shirt",
            "image": "https://img.freepik.com/premium-photo/front-view-black-hoodie-isolated-white-background_236836-22582.jpg",
            "label": "ALL PRODUCTS",
            "price": 60,

        },
        {
            "id": 0,
            "value": "Autoholics T-shirt",
            "image": "https://i.ibb.co/1nty1vB/autoholics-Shirt.jpg",
            "label": "CLOTHING",
            "price": 60,

        },
        {
            "id": 0,
            "value": "Autoholics T-shirt",
            "image": "https://t3.ftcdn.net/jpg/03/45/68/14/360_F_345681447_u9iTYWxDayaObHGZqv259Ew1ZHti5WWp.jpg",
            "label": "HATS",
            "price": 60,
        },
        {
            "id": 0,
            "value": "Autoholics T-shirt",
            "image": "https://a.1stdibscdn.com/the-louis-vuitton-x-supreme-keychain-features-louis-vuittons-red-signature-for-sale/22569652/v_161736921655800448864/v_16173692_1655800449132_bg_processed.jpg",
            "label": "ACCESSORIES",
            "price": 60,

        },
        {
            "id": 0,
            "value": "Autoholics T-shirt",
            "image": "https://sothebys-md.brightspotcdn.com/dims4/default/a160def/2147483647/strip/true/crop/1569x2000+0+0/resize/2048x2611!/quality/90/?url=http%3A%2F%2Fsothebys-brightspot.s3.amazonaws.com%2Fmedia-desk%2F87%2Fea%2Fd2f7a01f4c488f60209a0802f967%2F383n10395-bn66n.jpg",
            "label": "SALE",
            "price": 60,

        },
    ]


    return (
        <div className='Shop'>
            <div className='collections'>
                <Header cart={cart} toggleCartSidebar={toggleCartSidebar} />
                <div className='products_container'>
                    <h1 id='category'>Products</h1>
                    <div className='categories'>
                        {items.map((item) => (
                            <Category key={item.id} category={item} />
                        ))}
                    </div>
                </div>
            </div>
            <div className='sort_container'>
                <p>Sort By:</p>
                <div className='filter' onClick={toggleDropdown}>
                    <p>{selectedOption}</p>
                    <RiArrowDropDownLine className='dropdown_arrow' />
                    {dropdownOpen && (
                        <div className='dropdown_options'>
                            {/* Add your dropdown options here */}
                            <p onClick={() => handleOptionSelect('Alphabetically, A-Z')}>Alphabetically, A-Z</p>
                            <p onClick={() => handleOptionSelect('Alphabetically, Z-A')}>Alphabetically, Z-A</p>
                            <p onClick={() => handleOptionSelect('Price, low to high')}>Price, low to high</p>
                            <p onClick={() => handleOptionSelect('Price, high to low')}>Price, high to low</p>
                        </div>
                    )}
                </div>
                <p>{sortedItems.length} products</p>
            </div>
            <div className='items_container'>
                {sortedItems.map((item) => (
                    <Item key={item.id} item={item} /* Pass any other props needed */ />
                ))}
            </div>
            {/* Cart Sidebar JSX */}
            <CartSidebar />
        </div >
    )
}

export default Shop
import React, { useState, useEffect } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { collection, onSnapshot } from 'firebase/firestore';
import { auth } from '../utils/firebase';
import { signOut } from 'firebase/auth';
import db from '../utils/firebase';
import Header from '../components/layout/Header';
import Item from '../components/shop/Item';
import Category from '../components/shop/Category';
import data from '../data.json';


const Shop = () => {
    const [shop, setShop] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Alphabetically, A-Z');
    const [filteredData, setFilteredData] = useState([]);
    // Cart Functionality
    const [cart, setCart] = useState([])
    const [cartSidebarVisible, setCartSidebarVisible] = useState(false); // New state for cart sidebar visibility

    // Add to Cart Function
    const addToCart = (item) => {
        setCart([...cart, item]);
        console.log(cart, "the cart")
    }

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setDropdownOpen(false);
    };

    // Function to toggle cart sidebar
    const toggleCartSidebar = () => {
        setCartSidebarVisible(!cartSidebarVisible);
    };

    useEffect(() => {
        const unsub = onSnapshot(collection(db, 'shop'), (snapshot) => {
            const shopData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

            const sortData = () => {
                let sortedData = [...shopData];
                if (selectedOption === 'Price, low to high') {
                    sortedData = sortedData.sort((a, b) => a.price - b.price);
                } else if (selectedOption === 'Price, high to low') {
                    sortedData = sortedData.sort((a, b) => b.price - a.price);
                } else if (selectedOption === 'Alphabetically, A-Z') {
                    sortedData = sortedData.sort((a, b) => a.value.localeCompare(b.value));
                } else if (selectedOption === 'Alphabetically, Z-A') {
                    sortedData = sortedData.sort((a, b) => b.value.localeCompare(a.value));
                }
                setFilteredData(sortedData);
            };
            sortData();

        });

        return unsub; // cleanup
    }, [selectedOption]);

    useEffect(() => {
        setFilteredData(shop);
    }, [shop]);

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
                <p>{filteredData.length} products</p>
            </div>
            <div className='items_container'>
                {filteredData.map((item) => {
                    return <Item item={item} addToCart={addToCart} />
                })
                }
            </div>
            {/* Cart Sidebar JSX */}
            {cartSidebarVisible && (
                <div className={`cart-sidebar ${cartSidebarVisible ? 'cart-sidebar-visible' : ''}`}>
                    <h2>Cart Items</h2>
                    {cart.map((item, index) => (
                        <div key={index}>
                            <p>{item.value}</p>
                            <p>Quantity: 1</p> {/* Adjust according to your needs */}
                        </div>
                    ))}
                </div>
            )}
        </div >
    )
}

export default Shop
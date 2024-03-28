import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/layout/Header';
import CartSidebar from '../components/layout/CartSidebar';


import toast, { Toaster } from 'react-hot-toast';

import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import data from '../data.json'
import image from '../images/autoholicsShirt.jpg'

import { useDispatch, useSelector } from 'react-redux'; // Import the useDispatch hook
// import { addToCart } from '../redux/slices/cartSlice'; // Import the addToCart action
import { addToCartAsync } from '../redux/thunks/cartThunks'; // Import addToCartAsync
import { selectProductById, fetchShopItems } from '../redux/slices/shopSlice'; // Make sure you import fetchShopItems if you need to fetch items on this page


function Product() {
    const { productId } = useParams();



    const [cart, setCart] = useState([])
    const [qty, setQty] = useState(1)
    const [small, setSmall] = useState(false)
    const [medium, setMedium] = useState(false)
    const [large, setLarge] = useState(false)
    const [xLarge, setXLarge] = useState(false)
    const smallSelect = small ? "smallSelect" : ""
    const mediumSelect = medium ? "mediumSelect" : ""
    const largeSelect = large ? "largeSelect" : ""
    const xLargeSelect = xLarge ? "xLargeSelect" : ""

    const dispatch = useDispatch(); // Initialize the dispatch function
    const product = useSelector(state => selectProductById(state, productId));
    const shopStatus = useSelector((state) => state.shop.status);
    const cartCount = useSelector((state) => state.cart.items); // Get the number of items in the cart
    const user = useSelector((state) => state.auth.user); // Assuming you have user state in auth slice
    // console.log(user, "LOOK AT MEE")
    // console.log(cartCount, "current items")

    // Fetch products from the store if they haven't been loaded yet
    useEffect(() => {
        if (shopStatus === 'idle') {
            dispatch(fetchShopItems());
        }
    }, [shopStatus, dispatch]);

    // Temp func that turn on and off the state for each swatch (make dynamic later)
    const selectSize = (e) => {
        if (e.target.id === 'small') {
            setSmall(!small);
            setMedium(false);
            setLarge(false);
            setXLarge(false);
        } else if (e.target.id === 'medium') {
            setSmall(false);
            setMedium(!medium);
            setLarge(false);
            setXLarge(false);
        } else if (e.target.id === 'large') {
            setSmall(false);
            setMedium(false);
            setLarge(!large);
            setXLarge(false);
        } else if (e.target.id === 'x-large') {
            setSmall(false);
            setMedium(false);
            setLarge(false);
            setXLarge(!xLarge);
        }
    }

    // Refactor this function to dispatch the addToCart action
    const addToCartHandler = () => {
        // Determine the selected size
        let selectedSize = '';
        if (small) selectedSize = 'S';
        else if (medium) selectedSize = 'M';
        else if (large) selectedSize = 'L';
        else if (xLarge) selectedSize = 'XL';

        // Check if product exists and has been fetched successfully
        if (product) {
            // Construct the product object to add to cart
            const productToAdd = {
                id: product.id, // Use the actual product ID
                name: product.value, // Use the actual product name
                price: product.price, // Use the actual product price
                size: selectedSize, // Use the selected size
                quantity: qty, // Use the selected quantity
                image: product.image // Use the actual product image
            };

            // Dispatch the addToCart action with the dynamically constructed product object
            dispatch(addToCartAsync(user.uid, productToAdd));

            // // Provide feedback to the user
            // toast.success(`${product.name} added to cart`);

            // Reset the quantity and selected size for future additions
            setQty(1);
            setSmall(false);
            setMedium(false);
            setLarge(false);
            setXLarge(false);
        } else {
            // In case the product is not found or undefined
            // toast.error("Error adding product to cart");
        }
    };



    const increaseCount = () => {
        setQty(qty + 1)
    }

    const decreaseCount = () => {
        if (qty > 1) {
            setQty(qty - 1)
        }
    }

    // Fetch products from the store if they haven't been loaded yet
    useEffect(() => {
        if (shopStatus === 'idle') {
            dispatch(fetchShopItems());
        }
    }, [shopStatus, dispatch]);
    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
                containerClassName="toast-container"
            />
            <div className='Product'>
                <div className='nav_container'>
                    <Header cart={cart} />
                </div>
                <div className='content'>
                    {product ? (
                        <>
                            <img src={product.image} alt={product.name} className='box_1' />
                            <div className='box_2'>
                                <div className='product_name_wrapper'>
                                    <h1>{product.value}</h1>
                                </div>
                                <div className='price'>
                                    <h1>${product.price}</h1>
                                </div>
                                <div className='product_add_form'>
                                    <p id="size">Size</p>
                                    <div className='swatch_attributes'>
                                        <div id='small' className={`swatch ${smallSelect}`} onClick={selectSize}>S</div>
                                        <div id='medium' className={`swatch ${mediumSelect} `} onClick={selectSize}>M</div>
                                        <div id='large' className={`swatch ${largeSelect} `} onClick={selectSize}>L</div>
                                        <div id='x-large' className={`swatch ${xLargeSelect}`} onClick={selectSize}>XL</div>
                                    </div>
                                    <h4 id='size_chart'>SIZE CHART</h4>
                                    <span>Quantity</span>
                                    <div className='actions'>
                                        <div className='quantity_control'>
                                            <div className='switch'>
                                                <AiOutlineMinus className='switch_ctrl' onClick={decreaseCount} />
                                            </div>
                                            <div id='qtn'>{qty}</div>
                                            <div className='switch'>
                                                <AiOutlinePlus className='switch_ctrl' onClick={increaseCount} />
                                            </div>
                                        </div>
                                        <div className='add_to_cart_btn' onClick={addToCartHandler}>
                                            <h4>ADD TO CART</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <p>Product not found</p>
                    )}

                    <CartSidebar />
                </div>
            </div>
        </>);

}



export default Product
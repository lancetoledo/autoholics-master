import React from 'react'
import { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import toast, { Toaster } from 'react-hot-toast';
import * as Scroll from 'react-scroll';
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import data from '../data.json'
import image from '../images/autoholicsShirt.jpg'


function Product() {
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

    const addToCart = () => {
        let newItems = []
        console.log(qty, "QUANTITY")
        for (let i = 0; i < qty; i++) {
            newItems.push("item")
        }
        console.log(newItems)
        let temp = [...cart, ...newItems]
        console.log(cart, "BEFORE")
        setCart([...cart, temp])
        console.log(cart, "AFTER")
    }



    const increaseCount = () => {
        setQty(qty + 1)
    }

    const decreaseCount = () => {
        if (qty > 1) {
            setQty(qty - 1)
        }
    }


    return (
        <div className='Product'>
            <div className='nav_container'>
                <Header cart={cart} />
            </div>
            <div className='content'>
                <img src={image} className='box_1' />
                <div className='box_2'>
                    <div className='product_name_wrapper'>
                        <h1>AUTOHOLICS T-SHIRT</h1>
                    </div>
                    <div className='price'>
                        <h1>$29.99</h1>
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
                            <div className='add_to_cart_btn' onClick={addToCart}>
                                <h4>ADD TO CART</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product
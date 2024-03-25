import React from 'react';
import { FaStar } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Item = ({ item, addToCart }) => {
    const renderStars = () => {
        const stars = [];
        for (let i = 0; i < item.stars; i++) {
            stars.push(<FaStar key={i} className="star-icon" color="black" />);
        }
        return stars;
    };

    const productPage = () => {

    }

    return (
        <div className='item' key={item.id} onClick={() => addToCart(item)}>
            <Link className='logo_div' to="/product" style={{ textDecoration: 'none' }}>
                <img id='item_image' src={item.image} alt={item.value} />
            </Link>
            <div className='item_info'>
                <p id='value'>{item.value}</p>
                <div className='stars'>{renderStars()}</div>
                <p>${item.price?.toFixed(2)}</p>
            </div>
        </div>
    );
};
// nice
export default Item; 
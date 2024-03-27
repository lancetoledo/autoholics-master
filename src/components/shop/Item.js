import React from 'react';
import { FaStar } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Item = ({ item }) => {
    const renderStars = () => {
        const stars = [];
        for (let i = 0; i < item.stars; i++) {
            stars.push(<FaStar key={i} className="star-icon" color="black" />);
        }
        return stars;
    };

    return (
        <div className='item'>
            {/* Update the Link to use a template string with the product ID */}
            <Link to={`/product/${item.id}`} className='logo_div' style={{ textDecoration: 'none' }}>
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

export default Item;

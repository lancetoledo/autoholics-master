import React from 'react'
import { IoIosArrowRoundForward } from 'react-icons/io'

const Category = ({ category }) => {

    return (
        <div div className='category_container' key={category.id}>
            <img id='item_image' src={category.image} />
            <div className='label'>
                <h3>{category.label}</h3>
                <IoIosArrowRoundForward className='arrow_icon' />
            </div>
        </div>
    )
}

export default Category
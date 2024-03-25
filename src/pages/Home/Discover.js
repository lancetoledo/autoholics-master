import React from 'react'
import interior from '../../images/carinterior.jpg'

const Discover = () => {
    return (
        <div className='discover'>
            <div className='discover_wrapper'>
                <img className='interior' src={interior} alt='car interior' />
                <div className='contact_info'>
                    <div className='contact_wrapper'>
                        <div className='contact'>Contact Us</div>
                        <h1 className='visit'>Come and visit us at the shop</h1>
                        <p className='location'>154 Cooper Rd. West Berlin, NJ 08091</p>
                        <a className='learn_btn' href='https://www.facebook.com/spreme.wrps/'>Learn More</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Discover
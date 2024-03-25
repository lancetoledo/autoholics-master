import React from 'react'
import car from '../../images/wrapped.jpg'

const About = () => {
    return (
        <div className='about'>
            <div className='info'>
                <p className='info_title'>About Us</p>
                <p className='nav_item'>A new shop that specializes in Automotive customizaton such as window tint, decals, ceramic coating, paint protection film, wheel paint and vinyl wraps.</p>
                <div className='btn' id='about_btn'>Get Started</div>
            </div>
            <img className='car' src={car} alt='car' />
        </div>
    )
}

export default About
import React from 'react'
import Video from '../../videos/stock.mp4'

const Hero = () => {
    return (
        <div className='hero'>
            <div className='overlay'></div>
            <video className='video' src={Video} playsInline autoPlay loop muted></video>
            <div className='hero_content'>
                <h1 className='hero_title'>Automotive Customization</h1>
                <p className='hero_description'>Customize any vehicle with a full vinyl wrap, ceramic coating or window tint.</p>
                <div className='btn_wrapper'>
                    <button className='btn' id='hero_btn'>
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Hero
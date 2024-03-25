import React from 'react'
import vinyl from '../../images/vinylwraps.png'
import tint from '../../images/windowtint.png'
import coat from '../../images/ceramiccoating.png'

const Services = () => {
    return (
        <div className='services'>
            <h1 className='services_title'>Our Services</h1>
            <div className='deals'>
                <div className='option'>
                    <img className='icon' src={vinyl} alt='Vinyl Wraps' />
                    <p className='bold_p'>Vinyl Wraps</p>
                    <p>Starting From:</p>
                    <p className='bold_p'>$1,900</p>
                </div>
                <div className='option'>
                    <img className='icon' src={tint} alt='Vinyl Wraps' />
                    <p className='bold_p'>Vinyl Wraps</p>
                    <p>Starting From:</p>
                    <p className='bold_p'>$1,900</p>
                </div>
                <div className='option'>
                    <img className='icon' src={coat} alt='Vinyl Wraps' />
                    <p className='bold_p'>Vinyl Wraps</p>
                    <p>Starting From:</p>
                    <p className='bold_p'>$1,900</p>
                </div>
            </div>
        </div>
    )
}

export default Services
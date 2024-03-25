import React from 'react'
import {
    FaFacebook,
    FaInstagram,
    FaYoutube,
    FaTwitter,
    FaLinkedin
} from 'react-icons/fa';
const Footer = () => {
    return (
        <div className='footer'>
            <div className='footer_wrapper'>
                <div className='company'>Autoholics</div>
                <p className='copyright'>Autoholics © 2021 All rights reserved.</p>
                <div className='socials'>
                    <a className='socials_icon' href='https://www.facebook.com/spreme.wrps/' target="_blank" rel="noopener noreferrer">
                        <FaFacebook />
                    </a>
                    <a className='socials_icon' href='https://www.instagram.com/autoholics_sj/' target="_blank" rel="noopener noreferrer">
                        <FaInstagram />
                    </a>
                    <a className='socials_icon' href='https://www.instagram.com/s.npai/' target="_blank" rel="noopener noreferrer">
                        <FaTwitter />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Footer
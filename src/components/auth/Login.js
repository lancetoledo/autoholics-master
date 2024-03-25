import React from 'react'
import logo from '../../images/autoholicsLogo.png'
import google from '../../images/Google Logo.png'
import { Link } from "react-router-dom";

const Login = ({ title, button, href, link, help, headerStatement, firstNameInput, lastNameInput, emailInput, passwordInput, btnFunction, googleMsg, googleFunction, isSingingUp }) => {

    return (
        <div className='Login'>
            <div className='login_wrapper'>
                <Link className='logo_div' to="/" style={{ textDecoration: 'none' }}>
                    <img className='logo' src={logo} alt="Autoholics" />
                </Link>
                <div className='form_content'>
                    <form>
                        <h1>{title}</h1>
                        {isSingingUp ? <label htmlFor='for'>First Name</label> : ""}
                        {isSingingUp ? <input ref={firstNameInput} required></input> : ""}
                        {isSingingUp ? <label htmlFor='for'>Last Name</label> : ""}
                        {isSingingUp ? <input ref={lastNameInput} required></input> : ""}
                        <label htmlFor='for'>Email</label>
                        <input ref={emailInput} type='email' required></input>
                        <label htmlFor='for'>Password</label>
                        <input ref={passwordInput} type='password' required ></input>
                        <button className='login_btn' onClick={(e) => btnFunction(e)}>{button}</button>
                        <div onClick={() => googleFunction()} className='login_options'>
                            <img className='google' src={google} alt="google" />
                            <button type="button" className="login-with-google-btn" >
                                {googleMsg}
                            </button>

                            {/* <button type="button" className="login-with-google-btn" disabled>
                                {googleMsg}
                            </button> */}
                        </div>
                        <div className='options'>
                            <span>{headerStatement}</span>
                            <a href={href}>{link}</a>
                        </div>
                        <span className='forgot'>{help}</span>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
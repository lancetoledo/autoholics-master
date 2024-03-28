import React from 'react';
import '../styles/CheckOut.css'; // This is the CSS file for styling the component
import CheckOutHeader from '../components/layout/CheckOutHeader';

const Checkout = () => {
    return (
        <div className="checkout">
            <div className="checkout-container">
                <CheckOutHeader />
                {/* Express Checkout Section */}
                <div className="express-checkout">
                    <button className="paypal-button">PayPal</button>
                    <button className="amazon-button">Amazon Pay</button>
                    <button className="venmo-button">Venmo</button>
                    {/* ... Other express checkout options */}
                    <form className="checkout-form">
                        {/* Contact Section */}
                        <div className="contact-section">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" placeholder="Enter your email" />
                            {/* ... Other contact fields */}
                        </div>

                        {/* Delivery Section */}
                        <div className="delivery-section">
                            {/* ... Delivery fields */}
                        </div>

                        {/* Payment Section */}
                        <div className="payment-section">
                            <label htmlFor="card-number">Card Number</label>
                            <input type="text" id="card-number" placeholder="1234 5678 9012 3456" />
                            {/* ... Other payment fields */}
                        </div>

                        {/* ... Rest of the form */}
                    </form>
                </div>

                {/* Form Section */}


                {/* Order Summary Section */}
                <div className="order-summary">
                    {/* ... Order items and total */}
                    <h2>Order Summary</h2>
                </div>
            </div>


        </div>
    );
}

export default Checkout;

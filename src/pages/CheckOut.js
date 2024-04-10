import React from 'react';
import '../styles/CheckOut.css'; // This is the CSS file for styling the component
import CheckOutHeader from '../components/layout/CheckOutHeader';
import { useSelector, useDispatch } from 'react-redux';
import stripePromise from '../services/stripe';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';





const Checkout = () => {
    const stripe = useStripe();
    const elements = useElements();
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch(); // Hook to dispatch actions

    const handlePayment = async () => {
        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable form submission until Stripe.js has loaded.
            return;
        }
    
        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);
    
        // Use your card Element with other Stripe.js APIs
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: card,
        });
    
        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            // You can now pass paymentMethod.id to your backend to create a charge...
        }
    };
    


    
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
                            <label htmlFor="card-number">Card Details</label>
                            <CardElement id="card-number" options={{hidePostalCode: true}} />
                            {/* ... Other payment fields */}
                        </div>


                        {/* ... Rest of the form */}
                        <button type="submit" disabled={!stripe} className="pay-button">
                            Pay
                         </button>
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

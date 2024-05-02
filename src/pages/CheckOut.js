import React, { useEffect, useState } from 'react';
import '../styles/CheckOut.css';
import CheckOutHeader from '../components/layout/CheckOutHeader';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../redux/slices/cartSlice';
import stripePromise from '../services/stripe';
import { CardElement, useStripe, useElements, PaymentRequestButtonElement } from '@stripe/react-stripe-js';

const Checkout = () => {
    const stripe = useStripe();
    const elements = useElements();
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    const [paymentRequest, setPaymentRequest] = useState(null);
    const [paymentRequestAvailable, setPaymentRequestAvailable] = useState(false);

    // Calculate the total amount of the cart
    const calculateTotal = () => {
        const total = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
        return Math.round(total * 100); // Convert to cents and round to the nearest whole number
    }; // Convert to cents

    useEffect(() => {
        if (stripe) {
            const pr = stripe.paymentRequest({
                country: 'US',
                currency: 'usd',
                total: {
                    label: 'Total',
                    amount: calculateTotal(),
                },
                requestPayerName: true,
                requestPayerEmail: true,
            });

            pr.canMakePayment().then(result => {
                setPaymentRequestAvailable(!!result);
                setPaymentRequest(pr);
            });
        }
    }, [stripe, cartItems]); // Dependency array includes stripe to re-run effect if stripe object changes or cart items change

    const handlePayment = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            console.log('Stripe.js has not fully loaded.');
            return;
        }

        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.error('[error]', error);
            alert('Payment failed: ' + error.message);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            dispatch(clearCart());
            alert('Payment successful!');
        }
    };

    const CARD_ELEMENT_OPTIONS = {
        style: {
            base: {
                border: '1px solid lightgray'
            },
        },
    };

    return (
        <div className="checkout">
            <CheckOutHeader />
            <div className="checkout-container">
                <div className="checkout-left">
                    <div className='express-checkout'>
                        {/* <div className="delivery-form">
                            <h3 className='delivery-header'>Delivery</h3>
                            <label className='delivery-label' htmlFor="country">Country/Region</label>
                            <select id="country" name="country">
                                <option value="usa">United States</option>
                            </select>
                            <input type="text" id="first-name" placeholder="First name" />
                            <input type="text" id="last-name" placeholder="Last name" />
                            <input type="text" id="address" placeholder="Address" />
                            <input type="text" id="apartment" placeholder="Apartment, suite, etc. (optional)" />
                            <input type="text" id="city" placeholder="City" />
                            <select id="state" name="state">
                                <option value="nj">New Jersey</option>
                            </select>
                            <input type="text" id="zip" placeholder="ZIP code" />
                            <input type="text" id="phone" placeholder="Phone (optional)" />
                            <div className='save-info'>
                                <div id="save-info"><input type="checkbox"  /></div>
                                Save this information for next time
                            </div>
                        </div> */}
                        <form className="checkout-form" onSubmit={handlePayment}>
                            <div className="contact-section">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" placeholder="Enter your email" required />
                            </div>
                            <div className="payment-section">
                                <label>Card Details</label>
                                <CardElement id="card-element" options={{hidePostalCode: true}}  />
                                {paymentRequestAvailable && (
                                    <PaymentRequestButtonElement options={{paymentRequest}} />
                                )}
                            </div>
                            <button type="submit" disabled={!stripe} className="pay-button">
                                Pay ${calculateTotal() / 100} {/* Convert cents back to dollars for display */}
                            </button>
                        </form>
                    </div>
                   
                </div>
                <div className="order-summary">
                    <h2>Order Summary</h2>
                    <div className='cart-items'>
                        {cartItems.map((item, index) => (
                            <div key={index} className="cart-item">
                                <img src={item.image} alt={item.name} className="cart-item-image" />
                                <div className='cart-item-details'>
                                    <p>{item.name}</p>
                                    <p>{item.size}</p>
                                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                        <div className='cart-price'>Total: ${(calculateTotal() / 100).toFixed(2)}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;

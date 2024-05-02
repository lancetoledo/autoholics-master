import React from 'react';
import '../styles/CheckOut.css'; // This is the CSS file for styling the component
import CheckOutHeader from '../components/layout/CheckOutHeader';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCartSidebar, clearCart } from '../redux/slices/cartSlice'; // Import the action 
import stripePromise from '../services/stripe';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';





const Checkout = () => {
    const stripe = useStripe();
    const elements = useElements();
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch(); // Hook to dispatch actions

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const handlePayment = async (e) => {
        e.preventDefault(); // Prevent the form from submitting normally
        const totalAmount = calculateTotal();  // Convert to cents if required by multiplying by 100
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
            console.log('[PaymentMethod]', paymentMethod, "PAID");
            // You can now pass paymentMethod.id to your backend to create a charge...
            dispatch(clearCart());
        }
    };
    

console.log("hey")
    
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
                    <form className="checkout-form" onSubmit={handlePayment}>
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
                    <h2>Order Summary</h2>
                    {cartItems.map((item, index) => (
                        <div key={index} className="cart-item">
                            <img src={item.image} alt={item.name} className="cart-item-image" />
                            <div>
                                <p>{item.name}</p>
                                <p>${item.price.toFixed(2)} x {item.quantity}</p>
                            </div>
                        </div>
                    ))}
                    {console.log(cartItems, '?')}
                    <div>Total: ${calculateTotal().toFixed(2)}</div>
                </div>

            </div>


        </div>
    );
}

export default Checkout;

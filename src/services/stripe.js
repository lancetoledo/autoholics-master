// src/services/stripe.js
import { loadStripe } from '@stripe/stripe-js';

// Use your public Stripe key.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

export const initiateCheckout = async ({ lineItems }) => {
    const stripe = await stripePromise;

    // Call your backend to create the Checkout Session.
    // Assuming you have a backend route that handles this at '/create-checkout-session'.
    const response = await fetch('/create-checkout-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lineItems }),
    });

    const session = await response.json();

    // When the Checkout Session is created, redirect to the Stripe Checkout page.
    const result = await stripe.redirectToCheckout({
        sessionId: session.id,
    });

    if (result.error) {
        // Handle any errors that occur.
        alert(result.error.message);
    }
};

export default stripePromise;

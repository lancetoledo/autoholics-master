const functions = require("firebase-functions");
const admin = require("firebase-admin");
const Stripe = require("stripe");

// Initialize Firebase Admin
admin.initializeApp();

// Initialize Stripe with your secret key from the Firebase configuration
const stripe = new Stripe(functions.config().stripe.secret, {
  apiVersion: "2020-08-27",
});

exports.processPayment = functions.https.onCall(async (data, context) => {
  // Verify that the user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError(
        "unauthenticated",
        "You must be logged in to make a payment.",
    );
  }

  const {amount, currency, paymentMethodType} = data;

  try {
    // Create a PaymentIntent with the given amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: [paymentMethodType],
    });

    // Respond with the client secret for the payment intent
    return {clientSecret: paymentIntent.client_secret};
  } catch (error) {
    // Log and throw the error if payment processing fails
    console.error("Payment Intent creation failed", error);
    throw new functions.https.HttpsError(
        "internal",
        "Payment processing failed",
        error,
    );
  }
});

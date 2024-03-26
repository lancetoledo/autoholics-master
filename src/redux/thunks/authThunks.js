// src/redux/thunks/authThunks.js
import { loginStart, loginSuccess, loginFailure } from '../slices/authSlice';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { auth } from '../../utils/firebase';
import db from '../../utils/firebase';

export const signInWithEmail = (email, password) => async (dispatch) => {
    dispatch(loginStart());
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // Optionally check for additional user info or updates
        // For example, updating last login time or retrieving user-specific settings
        dispatch(loginSuccess(userCredential.user));
        // Redirect or perform additional actions
    } catch (error) {
        dispatch(loginFailure(error.message));
    }
};

export const signUpWithEmail = (email, password, firstName, lastName) => async (dispatch) => {
    dispatch(loginStart());
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const userData = {
            uid: userCredential.user.uid,
            email: userCredential.user.email,
            displayName: userCredential.user.displayName,
            // Add any other fields you need from the user object
        };
        // Save additional user info to Firestore
        await setDoc(doc(db, "users", userCredential.user.uid), {
            email: email,
            firstName: firstName,
            lastName: lastName,
            // Add any additional fields as necessary
        });
        dispatch(loginSuccess(userData));
    } catch (error) {
        dispatch(loginFailure(error.message));
    }
};

export const signInWithGoogle = () => async (dispatch) => {
    dispatch(loginStart());
    console.log("STARTING LOGIN!!");
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);

        // Attempt to retrieve the user document from Firestore
        const userDocRef = doc(db, "users", result.user.uid);
        const userDocSnap = await getDoc(userDocRef);

        // Check if a document for the user already exists
        if (!userDocSnap.exists()) {
            // No document exists, treat as new user
            console.log("No existing document for user, creating new one.");
            await setDoc(userDocRef, {
                email: result.user.email,
                firstName: result.user.displayName.split(" ")[0], // Assuming first name is the first part of displayName
                lastName: result.user.displayName.split(" ")[1] || "", // Assuming last name is the second part, if present
            });
            // Additional logic for new users can be added here
        } else {
            // Document exists, treat as returning user
            console.log("Existing document found for user, updating last login time.");
            // Optionally update last login time or perform other updates
            // await updateDoc(userDocRef, {
            //     lastLogin: new Date(), // Update last login time to current time
            // });
        }
        const userData = {
            uid: result.user.uid,
            email: result.user.email,
            displayName: result.user.displayName,
            // Add any other fields you need from the user object
        };

        dispatch(loginSuccess(userData));
    } catch (error) {
        console.log(error, "THERE IS AN ERROR");
        dispatch(loginFailure(error.message));
    }
};

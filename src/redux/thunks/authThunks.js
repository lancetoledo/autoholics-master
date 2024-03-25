// src/redux/thunks/authThunks.js
import { loginStart, loginSuccess, loginFailure } from '../slices/authSlice';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../utils/firebase';

export const signInWithEmail = (email, password) => async (dispatch) => {
    dispatch(loginStart());
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        dispatch(loginSuccess(userCredential.user));
        // Redirect or perform additional actions
    } catch (error) {
        dispatch(loginFailure(error.message));
    }
};

export const signInWithGoogle = () => async (dispatch) => {
    dispatch(loginStart());
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        dispatch(loginSuccess(result.user));
        // Redirect or perform additional actions
    } catch (error) {
        dispatch(loginFailure(error.message));
    }
};

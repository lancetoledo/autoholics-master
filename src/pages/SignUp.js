import React, { useRef } from 'react'
import Login from '../components/auth/Login';
import { useDispatch } from 'react-redux';
// Import the signUpWithEmail and signUpWithGoogle thunks
import { signUpWithEmail, signInWithGoogle } from '../redux/thunks/authThunks';


const SignUp = () => {
    // Use the useDispatch hook to get the dispatch function
    const dispatch = useDispatch();

    // Refs for the form inputs
    const emailRef = useRef();
    const passwordRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();

    // Handler for the Google sign-up process
    const handleSignUpWithGoogle = async (e) => {
        e.preventDefault();
        // Dispatch the signUpWithGoogle thunk
        dispatch(signInWithGoogle());
    };

    // Handler for the email/password registration process
    const handleRegister = async (e) => {
        e.preventDefault();
        // Dispatch the signUpWithEmail thunk, passing in the input values
        dispatch(signUpWithEmail(emailRef.current.value, passwordRef.current.value, firstNameRef.current.value, lastNameRef.current.value));
    };

    return (
        <Login
            title="Sign up"
            button="Sign up"
            href='/signin'
            link='Sign In'
            help=''
            headerStatement='Already have an account?'
            emailInput={emailRef}
            passwordInput={passwordRef}
            firstNameInput={firstNameRef}
            lastNameInput={lastNameRef}
            btnFunction={handleRegister}
            googleMsg='Sign up with Google'
            googleFunction={handleSignUpWithGoogle}
            isSingingUp={true}
        />
    );
};

export default SignUp;
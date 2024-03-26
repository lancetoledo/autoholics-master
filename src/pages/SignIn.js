import React, { useRef, useEffect } from 'react'
import Login from '../components/auth/Login';

// Import useDispatch from react-redux
import { useDispatch, useSelector } from 'react-redux';
// Import auth thunks
import { signInWithEmail, signInWithGoogle } from '../redux/thunks/authThunks';
import { useNavigate } from 'react-router-dom';


const SignIn = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    // Initialize useDispatch
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Access the authentication state
    const { user } = useSelector((state) => state.auth || {}); // Add a fallback to an empty object

    // Use useEffect to listen for changes in the authentication state
    useEffect(() => {
        if (user) {
            console.log("USER DOES EXIST!")
            navigate('/'); // Redirect to the home page if the user is logged in
        }
        // I can also react to changes in 'loading' or 'error' if needed for UI feedback
    }, [user, navigate]);

    console.log(user, "THIS IS THE USER")

    // Refactor login function to use Redux thunk
    const login = async (e) => {
        e.preventDefault();
        // Dispatch signInWithEmail thunk instead of calling Firebase directly
        dispatch(signInWithEmail(emailRef.current.value, passwordRef.current.value));

    };

    // Refactor loginWithGoogle function to use Redux thunk
    const handleLoginWithGoogle = async () => {
        // Dispatch signInWithGoogle thunk instead of calling Firebase directly
        dispatch(signInWithGoogle());

    };




    return (
        <Login
            title="Sign in"
            button="Sign in"
            href='/signup'
            link='Sign Up'
            help="Forgot Password"
            headerStatement='Need an account?'
            emailInput={emailRef}
            passwordInput={passwordRef}
            btnFunction={login}
            googleMsg='Sign in with Google'
            googleFunction={handleLoginWithGoogle}
        />
    )
}

export default SignIn
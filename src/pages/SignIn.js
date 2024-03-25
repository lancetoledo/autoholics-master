import React, { useRef } from 'react'
import Login from '../components/auth/Login';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { getAuth } from "firebase/auth";

// Google Auth
import { GoogleAuthProvider } from "firebase/auth";
const loginWithGoogle = async (e) => {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(auth, provider).then(async (response) => {
        //Create a user to the users collection
        console.log(response)
        if (response) {
            const auth = getAuth();
            const user = auth.currentUser;
            window.location = '/'
        }
    })
}


const SignIn = () => {

    const emailRef = useRef()
    const passwordRef = useRef()

    const login = async (e) => {
        e.preventDefault()
        try {
            await signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
            window.location = '/'
        }
        catch (err) {
            alert(err.message)
        }
    }

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
            googleFunction={loginWithGoogle}
        />
    )
}

export default SignIn
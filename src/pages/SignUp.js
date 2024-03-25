import React, { useRef } from 'react'
import Login from '../components/auth/Login';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth } from '../utils/firebase'
import db from '../utils/firebase';
import { setDoc, doc } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
// Google Auth
import { GoogleAuthProvider } from "firebase/auth";


const SignUp = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const firstNameRef = useRef()
    const lastNameRef = useRef()

    const signUpWithGoogle = async (e) => {
        const provider = new GoogleAuthProvider();
        return await signInWithPopup(auth, provider).then(async (response) => {
            //Create a user to the users collection
            console.log(response.user.uid)
            await setDoc(doc(db, "users", `${response.user.uid}`),
                {
                    appointments: [],
                    firstName: "",
                    lastName: "",
                }
            )
            if (response) {
                const auth = getAuth();
                const user = auth.currentUser;
                window.location = '/'
            }
        })
    }

    // console.log(firstNameRef.current.value)
    // console.log(lastNameRef.current.value)
    // console.log(emailRef.current.value)
    // console.log(passwordRef.current.value)

    const register = async (e) => {
        e.preventDefault()
        try {
            await createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
                .then(async (response) => {
                    //Create a user to the users collection
                    // console.log(response.user.uid)
                    await setDoc(doc(db, "users", `${response.user.uid}`),
                        {
                            appointments: [],
                            firstName: firstNameRef.current.value,
                            lastName: lastNameRef.current.value,
                        }
                    )
                    if (response) {
                        window.location = '/'
                    }
                })
        }
        catch (err) {
            alert(err.message)
        }
    }

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
            btnFunction={register}
            googleMsg='Sign up with Google'
            googleFunction={signUpWithGoogle}
            firstNameInput={firstNameRef}
            lastNameInput={lastNameRef}
            isSingingUp={true}
        />
    )
}

export default SignUp
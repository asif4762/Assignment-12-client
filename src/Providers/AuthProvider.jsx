import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../Firebase/firebase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider()
const AuthProvider = ({children}) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const SignIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signInWithGoogle = () =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, googleProvider)
    }

    const resetPassword = (email) =>{
        setLoading(true);
        return sendPasswordResetEmail(auth, email)
    }

    useEffect(() =>{
       const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log('current user', currentUser)
            setLoading(false);
    })
    return () => {
        return unsubscribe()
    }
    }, [])

    const logOut = () =>{
        setLoading(true);
        return signOut(auth);
    }

    const updateUserProfile = (name, photo) =>{
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })
    }

    const authInfo = {
        user,
        loading,
        createUser,
        SignIn,
        logOut,
        signInWithGoogle,
        resetPassword,
        updateUserProfile,
        setLoading
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
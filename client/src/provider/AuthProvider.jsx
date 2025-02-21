import { app } from "@/firebase/firebase.config.";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";

// Create the AuthContext
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // authentication provider setup
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider()

    // google log in
    const signInPopup = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }
    // create a new user
    const createNewUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    // user login in function
    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    // user profile update 
    const userProfile = (updateData) => {
        setLoading(true)
        return updateProfile(auth.currentUser, updateData)
    }
    // user Log out
    const userLogOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    // user auth info
    const authInfo = {
        user,
        loading,
        signInPopup,
        createNewUser,
        loginUser,
        userProfile,
        userLogOut,
        setLoading
    }

    // auth state observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => {
            unsubscribe()
        }
    }, [auth, user, loading])

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

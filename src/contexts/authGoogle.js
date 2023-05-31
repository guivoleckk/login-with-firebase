import { GoogleAuthProvider, getAuth, signInWithPopup, } from "firebase/auth";

import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { app } from "../services/firebaseConfig";
const provider = new GoogleAuthProvider();

export const AuthGoogleContext = createContext({});

export const AuthGoogleProvider = ({ children }) => {
    const auth = getAuth(app);
    const [user, setUser] = useState(null);

    useEffect(() => {
      const loadStorageAuth = () => {
        const sessionToken = sessionStorage.getItem("@AuthFirebase:token");
        const sessionUser = sessionStorage.getItem("@AuthFirebase:user");
        if (sessionToken && sessionUser) {
          setUser(sessionUser);
        }
      }
      loadStorageAuth();
    }, [])

    const signInGoogle = () => {
        signInWithPopup(auth, provider)
          .then((result) => {
           
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
           
            const user = result.user;
            setUser(user)
            sessionStorage.setItem("@AuthFirebase:token", token);
            sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
           
          }).catch((error) => {
            
            // const errorCode = error.code;
            // const errorMessage = error.message;
            
            // const email = error.customData.email;
            
            // const credential = GoogleAuthProvider.credentialFromError(error);
            
          });
      }

      function signOut() {
        sessionStorage.clear();
        setUser(null)

        return <Navigate to="/" />
      }

      return <AuthGoogleContext.Provider value={{ signInGoogle, signed: !!user, user, signOut }}>{children}</AuthGoogleContext.Provider>
};
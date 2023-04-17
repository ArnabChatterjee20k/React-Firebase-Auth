import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword
} from "firebase/auth";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [userLoading, setUserLoading] = useState(true);

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email,password){
    return signInWithEmailAndPassword(auth,email,password)
  }

  function logout(){
    signOut(auth)
  }

  function resetPassword(email){
    sendPasswordResetEmail(auth,email)
  }

  function resetEmail(email){
    updateEmail(currentUser,email)
  }
  
//   for updating the password in the update profile
  function resetProfilePassword(password){
    updatePassword(currentUser,password)
  }

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setUserLoading(false); // user is loaded and now we can display the information
    });

    return ()=>{
        unsuscribe()
    };
  }, []);
  
  const value = {
    currentUser,
    signUp,
    login,
    logout,
    resetPassword,
    resetEmail,
    resetProfilePassword
  };
  return (
    <AuthContext.Provider value={value}>
        {/* rendering the children only when the userLoading is false */}
      {!userLoading && children}
    </AuthContext.Provider>
  );
}

import { createContext, useState,useEffect } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListner } from "../utils/firebase/firebase.utils";
// as the actual value you want to access
export const UserContext = createContext( 
    {
    currentUser:null,
        setCurrentUser :()=>null,
}
)
export const UserProvider = ({children})=>{
    const [currentUser,setCurrentUser]=useState(null);
    const value ={currentUser,setCurrentUser};
    useEffect(()=>{
      const unsubscribe =  onAuthStateChangedListner((user)=>{ //gives a unsubscribe to stop the listener
        if(user){
            createUserDocumentFromAuth(user);
        }
        setCurrentUser(user);
      });
      return unsubscribe; 
    },[]);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
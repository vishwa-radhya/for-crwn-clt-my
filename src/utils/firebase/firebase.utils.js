import {initializeApp} from 'firebase/app';
import{getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
  createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
onAuthStateChanged
} from 'firebase/auth';

import {
  getFirestore,
  doc, //takes three args 1.db 2.collection 3.unique identifier
      //that uniqueid we get from c.log google login response
  getDoc,
  setDoc
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDGjEM7dO_Rp-KrRoW4PGtctFNPg4viCIg",
    authDomain: "crwn-clothing-my-db.firebaseapp.com",
    projectId: "crwn-clothing-my-db",
    storageBucket: "crwn-clothing-my-db.appspot.com",
    messagingSenderId: "328968049242",
    appId: "1:328968049242:web:e9f02b3ff383af0b97fe63"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);
  const googleProvider = new GoogleAuthProvider(); //can be many providers
  googleProvider.setCustomParameters({
    prompt:"select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => 
  signInWithPopup(auth,googleProvider);
  export const signInWithGoogleRedirect =()=>
   signInWithRedirect(auth,googleProvider);
  export const db = getFirestore();

 export const createUserDocumentFromAuth = async (userAuth,additionalInfo={}) =>{
  if(!userAuth) return;
    const userDocRef = doc(db,'users',userAuth.uid);
    console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());
    //the exists method says whether any data exists its  not 
    //now so its gives false
    if(!userSnapshot.exists()){
      const {displayName,email}=userAuth;
      const createdAt = new Date();
      try{
        await setDoc(userDocRef,{displayName,email,createdAt,
        ...additionalInfo});
      }catch(error){
        console.log('error creating the user',error.message);
      }
    }
    return userDocRef;
  };
  
export const createAuthUserWithEmailAndPassword = async(email,password)=>{
   if(!email || !password) return; //nothing
   return await createUserWithEmailAndPassword(auth,email,password);
}
export const signInAuthUserWithEmailAndPassword = async(email,password)=>{
   if(!email || !password) return; //nothing
   return await signInWithEmailAndPassword(auth,email,password);
};

export const signOutUser =async()=>await signOut(auth);

export const onAuthStateChangedListner =(callback)=>
onAuthStateChanged(auth,callback);
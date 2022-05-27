import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPYyfyp81AtA9Ic6tJiuf5Ai9ApABGKzk",
  authDomain: "gokeep-db.firebaseapp.com",
  projectId: "gokeep-db",
  storageBucket: "gokeep-db.appspot.com",
  messagingSenderId: "745101248034",
  appId: "1:745101248034:web:fa616056ac342eff7a6c7b",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  // If user data does not exist
  //  create / set the document with the data from userAuth in my collection
  if (userSnapshot.exists() === false) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }
  // If user data exist

  // return userDocRef
  return userDocRef;
};

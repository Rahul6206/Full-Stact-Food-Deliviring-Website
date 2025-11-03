// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "foodyzone-370d4.firebaseapp.com",
  projectId: "foodyzone-370d4",
  storageBucket: "foodyzone-370d4.firebasestorage.app",
  messagingSenderId: "277514523675",
  appId: "1:277514523675:web:6259dd3b561297a62194be"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
export {app,auth};
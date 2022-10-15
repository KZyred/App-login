//firebase config key setup
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1i1YplFPgLIXk4g_D6sVOPkiIc2SJll0",
  authDomain: "test-32860.firebaseapp.com",
  projectId: "test-32860",
  storageBucket: "test-32860.appspot.com",
  messagingSenderId: "431527003720",
  appId: "1:431527003720:web:ce279d9727bcbdba7b7a7d",
  measurementId: "G-3XJ9P1BC2M"
};

// Initialize Firebase
if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig); 
}
// const analytics = getAnalytics(app);
export { firebase }
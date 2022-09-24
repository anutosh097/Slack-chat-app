// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvpSPVGqsbDcoZQZ_Al7jj-URS6TTHNw8",
  authDomain: "react-slack-clone-91384.firebaseapp.com",
  projectId: "react-slack-clone-91384",
  storageBucket: "react-slack-clone-91384.appspot.com",
  messagingSenderId: "354510677817",
  appId: "1:354510677817:web:4a47116a0409b784402ae8",
  measurementId: "G-Q5P9W21H75",
  databaseURL: "https://react-slack-clone-91384-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);



export default firebase;
 
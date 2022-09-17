// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvpSPVGqsbDcoZQZ_Al7jj-URS6TTHNw8",
  authDomain: "react-slack-clone-91384.firebaseapp.com",
  projectId: "react-slack-clone-91384",
  storageBucket: "react-slack-clone-91384.appspot.com",//react-slack-clone-91384.appspot.com
  messagingSenderId: "354510677817",
  appId: "1:354510677817:web:4a47116a0409b784402ae8",
  measurementId: "G-Q5P9W21H75"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);
// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);



export default firebase;
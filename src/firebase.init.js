import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyBGZvHEjzNBMlJ6wIFguEHemh25KC1LP28",
    authDomain: "task-8efa0.firebaseapp.com",
    projectId: "task-8efa0",
    storageBucket: "task-8efa0.appspot.com",
    messagingSenderId: "26410693334",
    appId: "1:26410693334:web:c4f1ed57931738821b4f77"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth;
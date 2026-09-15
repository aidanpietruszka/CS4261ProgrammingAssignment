// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBy9WonFeK3d9ZEuDGDQtR3TdRldZ0SU3w",
  authDomain: "mobileappsprogram-6e65c.firebaseapp.com",
  databaseURL: "https://mobileappsprogram-6e65c-default-rtdb.firebaseio.com/",
  projectId: "mobileappsprogram-6e65c",
  storageBucket: "mobileappsprogram-6e65c.firebasestorage.app",
  messagingSenderId: "588329493891",
  appId: "1:588329493891:web:9dc57909591751244a42b6",
  measurementId: "G-D4FNHTGQFD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6keswuQgL1_GFqqIIApRe0tgJ2Qf7jeQ",
  authDomain: "tangiguru2022.firebaseapp.com",
  databaseURL: "https://tangiguru2022-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tangiguru2022",
  storageBucket: "tangiguru2022.appspot.com",
  messagingSenderId: "236166099414",
  appId: "1:236166099414:web:21a1685a13d6b15628b477"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8hu1-CB1SJ8YLae-sG5IaO37DsgB4evw",
  authDomain: "portafolioapp-6c353.firebaseapp.com",
  projectId: "portafolioapp-6c353",
  storageBucket: "portafolioapp-6c353.firebasestorage.app",
  messagingSenderId: "882149235674",
  appId: "1:882149235674:web:1016088602d88c56547ee3"
};

// Initialize Firebase
const fireBaseApp = initializeApp(firebaseConfig);
const fireBaseDb = getFirestore(fireBaseApp);

export{
  fireBaseApp,
  fireBaseDb
}
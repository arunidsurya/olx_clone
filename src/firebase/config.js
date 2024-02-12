import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import 'firebase/storage'


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDA81DxR0Bw2pwnX2_JtbYk945481ea7vI",
    authDomain: "olx1-ea563.firebaseapp.com",
    projectId: "olx1-ea563",
    storageBucket: "olx1-ea563.appspot.com",
    messagingSenderId: "360905095067",
    appId: "1:360905095067:web:d8f317fe9b9495645ad33e",
    measurementId: "G-HMS64B1YSC"
  };

const firebaseApp = initializeApp(firebaseConfig);

const firestore = getFirestore(firebaseApp);

const auth = getAuth(firebaseApp);



export { firebaseApp , firestore ,auth}
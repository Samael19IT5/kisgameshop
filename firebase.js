// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDpc6YwUYyP409XRXKkwNhCAgPCnIlkQsA',
  authDomain: 'kis-game-shop.firebaseapp.com',
  projectId: 'kis-game-shop',
  storageBucket: 'kis-game-shop.appspot.com',
  messagingSenderId: '227754829251',
  appId: '1:227754829251:web:49549df3d34b14c83bc976',
  measurementId: 'G-3PK59T8ZEH',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
db.settings({
  experimentalForceLongPolling: true,
  timestampsInSnapshot: true,
  merge: true,
  ignoreUndefinedProperties: true,
});

const auth = firebase.auth();

export {db, auth};

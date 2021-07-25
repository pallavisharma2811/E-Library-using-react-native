import firebase from 'firebase';
require('@firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyDC45n5F1vIqAXvEKw5UEuYD4zvH4zklsw",
    authDomain: "wily-app-2dd44.firebaseapp.com",
    projectId: "wily-app-2dd44",
    storageBucket: "wily-app-2dd44.appspot.com",
    messagingSenderId: "608333265073",
    appId: "1:608333265073:web:bbfa48ff9021ee40a90a90"
  };

firebase.initializeApp(firebaseConfig);

export default firebase.firestore()
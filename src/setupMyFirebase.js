import firebase from 'firebase';

  // Initialize Firebase
   var config = {
    apiKey: "AIzaSyAGsNm9wc4K-A_KWF_sNXTwiu0JmXqWpDI",
    authDomain: "geddit-b08d7.firebaseapp.com",
    databaseURL: "https://geddit-b08d7.firebaseio.com",
    projectId: "geddit-b08d7",
    storageBucket: "geddit-b08d7.appspot.com",
    messagingSenderId: "184316917394"
  };
  firebase.initializeApp(config);

  
  export const frbase = firebase;


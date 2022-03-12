import firebase from 'firebase';
var firebaseConfig = {
  apiKey: "AIzaSyBiEDwZLlsu3PxFkMAyTm2WqRZkEZbyg2k",
  authDomain: "testtodo-6fe51.firebaseapp.com",
  databaseURL: "https://testtodo-6fe51-default-rtdb.firebaseio.com",
  projectId: "testtodo-6fe51",
  storageBucket: "testtodo-6fe51.appspot.com",
  messagingSenderId: "31062523396",
  appId: "1:31062523396:web:034eb75e3caf03d3fd3f51",
  measurementId: "G-51C70TDC6W"
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
export default fire; 
import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyCKMyEjpmkrxGSWhtl2XSIQhSq4tGeXPGQ",
  authDomain: "weight-tracker-8d9e5.firebaseapp.com",
  projectId: "weight-tracker-8d9e5",
  storageBucket: "weight-tracker-8d9e5.appspot.com",
  messagingSenderId: "664281847945",
  appId: "1:664281847945:web:61b96f9714705af108ce58"
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;
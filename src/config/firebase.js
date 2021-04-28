import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyD4p4lMGaqtWgyeiAPaQGQmg1Uzl8xAxYc",
    authDomain: "zeitplan-ecad5.firebaseapp.com",
    projectId: "zeitplan-ecad5",
    storageBucket: "zeitplan-ecad5.appspot.com",
    messagingSenderId: "980674427557",
    appId: "1:980674427557:web:462a266b336f0d6ff72b4c",
    measurementId: "G-ZCG6Q830C9"
};
// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
firebase.analytics();

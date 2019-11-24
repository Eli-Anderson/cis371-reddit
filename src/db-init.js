import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBjLQQVT_p2WvKcngzlMgwrA8roykW8PvY",
    authDomain: "cis371reddit.firebaseapp.com",
    databaseURL: "https://cis371reddit.firebaseio.com",
    projectId: "cis371reddit",
    storageBucket: "cis371reddit.appspot.com",
    messagingSenderId: "408840711489",
    appId: "1:408840711489:web:8a321096229e2e2ac385c0",
    measurementId: "G-CR1H4R4FN2"
};

firebase.initializeApp(firebaseConfig);

const Firestore = firebase.firestore();
const AppAUTH = firebase.auth();
const increment = firebase.firestore.FieldValue.increment;
const getTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export { Firestore, AppAUTH, increment, getTimestamp };

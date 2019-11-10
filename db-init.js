import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

var firebaseConfig = {
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

const AppDB = firebase.database();
const AppAUTH = firebase.auth();
export { AppDB, AppAUTH };

import React from 'react';
import App from "./src/Index";
import * as firebase from "firebase";

firebase.initializeApp({
    apiKey: "AIzaSyClvKKxYhr7sx9QoICnOjUQRMLzx1EFkbk",
    authDomain: "rnfirebase-1d7bf.firebaseapp.com",
    databaseURL: "https://rnfirebase-1d7bf.firebaseio.com",
    projectId: "rnfirebase-1d7bf",
    storageBucket: "rnfirebase-1d7bf.appspot.com",
});

export default App;


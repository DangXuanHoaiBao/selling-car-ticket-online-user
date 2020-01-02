/* eslint-disable quotes */
import * as firebase from 'firebase';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAfyfgnJFhigAj8yxwuL53Im4Ft0w_3XN0",
    authDomain: "selling-car-ticket-user-88731.firebaseapp.com",
    databaseURL: "https://selling-car-ticket-user-88731.firebaseio.com",
    projectId: "selling-car-ticket-user-88731",
    storageBucket: "selling-car-ticket-user-88731.appspot.com",
    messagingSenderId: "292209678248",
    appId: "1:292209678248:web:83fb58d3feabc48527af9d",
    measurementId: "G-WN5FQ2TXWE"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const database = firebase.database();
export {
    database, storage, firebase
}

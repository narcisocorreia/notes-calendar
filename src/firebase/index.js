import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyDMe7HKI0zl9rGpZsSvsjtwfC49sQPfldo",
  authDomain: "notes-calendar-903d5.firebaseapp.com",
  databaseURL: "https://notes-calendar-903d5.firebaseio.com",
  projectId: "notes-calendar-903d5",
  storageBucket: "notes-calendar-903d5.appspot.com",
  messagingSenderId: "148700066640",
  appId: "1:148700066640:web:b831c1aab894e74fe83255",
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;

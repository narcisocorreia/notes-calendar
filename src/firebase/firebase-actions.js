import firebase from "./index";

export function pushData(collectionName, data) {
  firebase.firestore().collection(collectionName).add(data);
}

export function getData(collectionName) {
  firebase
    .firestore()
    .collection(collectionName)
    .onSnapshot((snapshot) => {
      console.log(snapshot);
    });
}

export function login(email, password) {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(resolve)
      .catch((err) => {
        reject(err);
      });
  });
}

export function createNewUser(email, password) {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(resolve)
      .catch((err) => {
        reject(err);
      });
  });
}

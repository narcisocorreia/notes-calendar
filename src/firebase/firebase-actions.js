import firebase from "./index";

export function getCurrentUser() {
  return firebase.auth().currentUser;
}
export async function pushData(data) {
  const db = firebase.firestore();
  const collection = await db.collection("calendar-notes");

  return new Promise((resolve, reject) => {
    collection
      .add(data)
      .then((result) => {
        console.log(result);
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function getData(date) {
  const db = firebase.firestore();
  const collection = await db.collection("calendar-notes");

  return new Promise((resolve, reject) => {
    const query = collection
      .where("userID", "==", getCurrentUser().uid)
      .where("date", "==", date);

    query
      .get()
      .then((result) => {
        result.forEach((doc) => {
          resolve(doc.data());
        });
      })
      .catch((err) => {
        reject(err);
      });
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

export function onAuthStateChange() {
  return new Promise((resolve) => {
    firebase.auth().onAuthStateChanged((user) => {
      resolve(user);
    });
  });
}

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
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function uploadData(newNote,dockID) {
  const db = firebase.firestore();
  const doc = await db.collection("calendar-notes").doc(dockID);

  return doc.update({
    note: newNote
  })
}

export async function deleteData(dockID) {
  const db = firebase.firestore();
  const doc = await db.collection("calendar-notes").doc(dockID);

  return doc.delete();
}

export async function getTodayData(date) {
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
          resolve(doc);
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function getUserData() {
  const db = firebase.firestore();
  const collection = await db.collection("calendar-notes");

  return new Promise((resolve, reject) => {
    const query = collection.where("userID", "==", getCurrentUser().uid);
    let queryResult = [];
    query
      .get()
      .then((result) => {
        result.forEach((doc) => {
          queryResult.push(doc.data());
        });
        resolve(queryResult);
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

export function logout() {
  firebase.auth().signOut();
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

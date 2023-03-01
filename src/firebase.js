import { initializeApp } from "firebase/app";

import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut} from "firebase/auth";

import { getFirestore, setDoc, doc } from "firebase/firestore";


const firebaseConfig = ({
  apiKey: "AIzaSyBs38gmBYaxfBv-of31Tw15jhbDQLmgfrA",
  authDomain: "blockfall-database.firebaseapp.com",
  projectId: "blockfall-database",
  storageBucket: "blockfall-database.appspot.com",
  messagingSenderId: "306283887660",
  appId: "1:306283887660:web:c2664e85c76b6820a56589",
  measurementId: "G-EKDSSCB249"
})

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch {
        alert("login failed. Try again.")
    }
};

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            name,
            email
        });
    } catch {
        alert("signup failed. Try again.")
    }
};

const addLeaderboardEntry = async (username, pageName, points, date, time) => {
    const uid = auth.currentUser.uid
    await setDoc(doc(db, pageName, uid), {
        username: username,
        score: points,
        date: date,
        time: time
    });
}
const logout = () => {           
    signOut(auth);
}

export {
    auth,
    db,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    logout,
    addLeaderboardEntry
};
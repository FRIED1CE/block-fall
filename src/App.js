import './Styles.css';

import React, { useState, useEffect } from 'react';

import MainRoutes from "./components/MainRoutes";

import { auth, db} from "./firebase";

import { doc, getDoc } from "firebase/firestore";



export default function App() {
  const [username, setUsername] = useState("")


  useEffect(()=>{
    auth.onAuthStateChanged((user) => {
      if (user) {
        let uid = user.uid;
  
        getDoc(doc(db, "users", uid)).then(docSnap => {
          if (docSnap.exists()) {
            setUsername(docSnap.data().name);
          } 
        });
      }
      else if (!user){
        setUsername("")
      }
  },[auth])
  })

  return (
    <div className="App">
        <MainRoutes username={username} />
    </div>
    );
}




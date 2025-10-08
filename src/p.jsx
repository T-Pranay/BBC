import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDocs,
  collection,
  deleteField,
  updateDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";
import { db } from "./firebase.js";

import { useState,useEffect } from "react"
import Team from './team.jsx'
import { useNavigate} from "react-router-dom";
import './css/real.css'
import screenshot from './assets/Picture1.jpg';

function P(){
    const [first,setFirst] = useState(true);
    const [intro,setintro] = useState(false);
    return(
        <>
            {first && (
                <picture>
                    <img id="first-bible-image" src={screenshot} alt="Screenshot" />
                </picture>
            )}
        </>
    )
}

export default P
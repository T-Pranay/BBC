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
import "./Full.css"
import Team from './team.jsx'
import { useNavigate} from "react-router-dom";

import "./Full.css"
function Play(){
    const [temptext,setTemptext] = useState("");
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        try{
            const fetch = async () =>{
            const ref = await getDocs(collection(db,'games'));
            const dataSnap = ref.docs.map((doc) => ({
                id:doc.id,
                ...doc.data()
            }))
            setData(dataSnap)
            setLoading(false)
        }
            fetch()
        } catch(err){
            console.log(err)
        }
    },[])
    return (
        <div>
            {loading? (
                <div>No data found.</div>
            ) : (
                data.map((d) => (
                    <>
                    <div key={d.id} className="games-container">
                            <div className="play-game">{d.name}</div>
                            <div className="play-arrow">&lt;</div>
                    </div>
                    </>
                ))

            )}
        </div>
    )
}

export default Play
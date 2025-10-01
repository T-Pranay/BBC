import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDocs,
  getDoc,
  collection,
  deleteField,
  updateDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";
import { db } from "./firebase.js";

import { useState,useEffect } from "react"
import {useParams} from 'react-router-dom'
import "./Full.css"

function Team(){

    const {gameId,teamName} = useParams();
    const [questions, setQuestions] = useState([]);
    const [data,setData] = useState([])

    useEffect(()=>{
        const fetchQues = async () =>{
            try{
                const teamRef = doc(db,"games",gameId,"team",`team:${teamName}`);
                const teamSnap = await getDoc(teamRef);
                if(!teamSnap.exists()){
                    await setDoc(teamRef,{
                        questions : [],
                    },{merge:true})
                    setData(teamSnap)
                } else {
                    setQuestions(teamSnap.data().questions || [])
                }
            } catch(err){
                console.log(err)
            }
        }

        fetchQues()
    },[gameId,teamName])


    return(
        <>
            {data.map((d) =>(
                <div className="team-name">{d.teamName}</div>
            ))}
        </>
    )
}
export default Team
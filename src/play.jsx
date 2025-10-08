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
import "./css/Full.css"
import Team from './team.jsx'
import { useNavigate} from "react-router-dom";

function Play(){
    const [temptext,setTemptext] = useState("");
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(true);
    const [overlay,setOverelay] = useState(false);
    const [id, setId] = useState(null);

    const navigate = useNavigate();
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

    const getDetails = async (id) =>{
        const ref = doc(db,'games',id);
        const snap = await getDoc(ref);
        if (snap.exists()) {
            setId({ 
                id: snap.id, 
                ...snap.data() 
            }); 
        } else {
            console.log("No such document!");
        }
    }

    useEffect(() => {
    }, [id]);

    // whole game

    const handleGame = async (id) =>{
        navigate(`/p/${id}`)
    }

    return (
        <div>
            {loading? (
            <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "1.5rem"
            }}>
                No data found.
            </div>
            ) : (
                data.map((d) => (
                    <div key={d.id} className="games-container" onClick={() => {setOverelay(true); getDetails(d.id)}}>
                            <div className="play-game">{d.name}</div>
                            <div className="play-arrow">&lt;</div>
                    </div>
                ))
            )}
            {overlay && id && (
            <div className="play-overlay">
                <div className="close" onClick={() => {setOverelay(false);setId(null)}} >X</div>
                <div className="play-game-name">{id.name}</div>
                <div className="play-what">Play</div>
                <div className="whole" onClick={() => handleGame(id.id)}>Whole game</div>
                <div className="line-play"></div>
                <div className="teams-avail"  >
                    {Array.from({length : id.teams}).map((_,t) =>(
                        <div className="teams-show" key = {t.id}>Team {t +1}</div>
                    ))}
                </div>    
            </div>
            )}

        </div>
    )
}

export default Play
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDocs,
  collection
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";
import { db } from "./firebase.js";

import { useState,useEffect } from "react"
import "./Full.css"



function Game(){

    const [game,setGame] = useState('');
    const [teams,setTeams] = useState('');
    const [ques,setQues] = useState('');
    const [overlay,setOverlay] = useState(false);
    const [gamesSet,setGamesSet] = useState([]);


       const fetchGames = async() =>{
            try{
                const query = await getDocs(collection(db,"games"));
                const data = query.docs.map((doc)=>({
                    id:doc.id,
                    ...doc.data(),
                }));
                setGamesSet(data)
            } catch(err){
                console.error("Error fetching games:", err);
            }
        }
   

    useEffect(()=>{
        fetchGames();
    },[]);
    const handleSubmit =async (e) => {
        e.preventDefault();
        setOverlay(false);

        if (!game || teams < 1 || ques < 1) {
            alert("Enter valid values");
            return;
        }

    const gameId = "game-" + Date.now();
    try {
      await setDoc(doc(db, "games", gameId), {
        name: game,
        teams:teams,
        ques:ques,
        createdAt: new Date().toISOString()
      });

      fetchGames();

      setGame("");
      setTeams("");
      setQues("");
    } catch (err) {
      console.error("Error creating game:", err);
      alert("Failed to create game.");
    }
    }


    return(
        <>
            <div className="add-game"  onClick={() => setOverlay(true)}>
                <svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink" width="20px" height="20px" viewBox="0 0 344.339 344.339"
                    xmlSpace="preserve">
                    <g>
                        <g>
                            <g>
                                <path d="M0,0v344.339h344.339V0H0z M25.358,318.98V25.358H318.98V318.98H25.358z" />
                            </g>
                            <g>
                                <polygon points="183.627,44.708 160.7,44.646 160.7,154.779 50.6,154.779 50.6,177.718 160.7,177.718 160.7,287.821 
				                183.627,287.821 183.627,177.718 293.743,177.718 293.743,154.779 183.627,154.779 			" />
                            </g>
                        </g>
                    </g>
                </svg>

                <p id="add-text">Add Game</p>
            </div>

            {/* overlay */}

            {overlay && (
             <div className="content"  >
                 <div className="blur"></div>
                 <form className="overlay" onSubmit={handleSubmit}>
                    <button className="cancel"  onClick={() => setOverlay(false)}>X</button>
                     <label id="game-label" htmlFor="game-name">Game name</label>
                     <input id="game-name" type="text" value={game} onChange={(e)=> setGame(e.target.value)} ></input>
                     <label id="count-label" htmlFor="teams-count">Total teams</label>
                     <input id="teams-count" type="number" value={teams} onChange={(e)=>
                     setTeams(e.target.value)}></input>
                     <label id="ques-label" htmlFor="ques-count">Number of questions</label>
                     <input id="ques-count" type="number" value={ques} onChange={(e)=> setQues(e.target.value)}></input>
                     <button type="submit" className="game-submit">Submit</button>
                 </form>
             </div>                
            )}       

            {/* show games and teams */}

            {gamesSet.length > 0 && (
            <>
                {gamesSet.map((g) => (
                <div key={g.id} className="games-content">
                    <div className="game-card-id">
                        <div className="game-name">{g.name}</div>
                        <div className="team-boxes">
                            {Array.from({ length: g.teams }).map((_, i) => (
                            <div key={i} className="box">
                                Team {i + 1}
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
                ))}
            </>
            )}
        </>
    )
}

export default Game
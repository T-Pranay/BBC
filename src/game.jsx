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
import { useNavigate,Route,Routes } from "react-router-dom";



function Game(){

    const [game,setGame] = useState('');
    const [teams,setTeams] = useState('');
    const [ques,setQues] = useState('');
    const [overlay,setOverlay] = useState(false);
    const [gamesSet,setGamesSet] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletegame,setDeletegame] = useState(null);
    const [confirmdelete,setConfirmdelete] = useState(null);
    const [temptext,setTemptext] = useState("");

    const navigate = useNavigate();

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
            }finally {
        setLoading(false);
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

      setTemptext("Loading new game...");
        setTimeout(() => {
            setTemptext('')
      }, 4000);

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

    const handleDelete = async (id) => {
      try {
        setGamesSet((prevGames) => prevGames.filter((g) => g.id !== id));
        setTemptext("Deleted game...");
        setTimeout(() => {
          setTemptext('')
        }, 4000);

        const gameRef = doc(db, "games", id);
        const teamsCol = collection(db, "games", id, "team");
        const teamsSnap = await getDocs(teamsCol);

        for (const teamDoc of teamsSnap.docs) {
          await deleteDoc(teamDoc.ref);
        }
        await deleteDoc(gameRef);

        fetchGames();
      } catch (err) {
        console.log(err)
      }
    }

    const navigatePage = (gameId,teamName) => {
        navigate(`/team/${gameId}/${teamName}`);
    };


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

            {/* {temp text} */}

            {temptext && (
                <div className="temp-text">{temptext}</div>
            )}

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

     {loading ? (
        <div className="games-skeleton">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="game-card-skeleton">
              <div className="game-name-skeleton shimmer"></div>
              <div className="team-boxes">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="box-skeleton shimmer"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        gamesSet.length > 0 && (
          <>
            {gamesSet.map((g) => (
              <div key={g.id} className="games-content">
                <div className="game-card-id">
                  <div className="game-name">{g.name}</div>
                  <div className="more" onClick={() => setDeletegame(deletegame === g.id ? null : g.id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000ff"><path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z"/></svg>
                 </div>
                 {deletegame === g.id && (
                    <>
                        <div className="delete" onClick={() => setConfirmdelete(g.id)}>Delete</div>
                        {confirmdelete === g.id && (
                            <div className="confirm-delete">
                                <div className="doc-name">Delete {g.name}?</div>
                                <ul id="delete-options">
                                    <li id="cancel" onClick={() => {setConfirmdelete(null); setDeletegame(null)}}>Cancel</li>
                                    <li id="delete"  onClick={() => {handleDelete(g.id);setConfirmdelete(null)}}>Delete</li>
                                </ul>
                            </div>
                        )}
                    </>
                 )}
                  <div className="team-boxes">
                    {Array.from({ length: g.teams }).map((_, i) => (
                      <div key={i} className="box" onClick = {() =>{navigatePage(g.id,i + 1)}}>
                        Team {i + 1}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </>
        )
      )}
        </>
    )
}

export default Game
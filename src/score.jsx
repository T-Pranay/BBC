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
import "./css/Full.css"
import Team from './team.jsx'
import { useNavigate,Route,Routes } from "react-router-dom";


function Teams(){

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchScores = async () => {
            const ref = await getDocs(collection(db, 'games'));
            const gameData = ref.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            const gameTeams = await Promise.all(
                gameData.map(async (game) => {
                    const teamRef = await getDocs(collection(db, 'games', game.id, 'team'));
                    const teamData = teamRef.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    return {
                        ...game,
                        teams: teamData
                    }
                })
            )
            setData(gameTeams);
            setLoading(false);
        }
        fetchScores();
    }, []);

    return (
        <>
            {loading ? (
                <div className="score-skeleton">
                    {[...Array(1)].map((_, i) => (
                        <div key={i} className="game-card-skeleton">
                            <div className="game-name-skeleton shimmer"></div>
                            <div className="score-boxes">
                                {[...Array(3)].map((_, j) => (
                                    <div key={j} className="score-box-skeleton shimmer"></div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                data.length > 0 && (
                    data.map((d) => (
                        <>
                        <div key={d.id} className="game-boxes">
                            <h2>{d.name}</h2>
                            {d.teams.map(team => (
                                <div key={team.id} className="teams-scores">
                                    <div className="wrapper">
                                        <p className="team-dis">{team.id}</p>
                                        <div className="score-dis">{team.score}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="some"></div>
                        </>
                    ))
                )
            )}
        </>
    )
}

export default Teams
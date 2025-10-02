import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";
import { db } from "./firebase.js";
import { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import "./Full.css";
import Question from './questions.jsx'

function Team() {
  const { gameId, teamName } = useParams();
  const [data, setData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const setTeam = async () => {
      try {
        const gameRef = doc(db, "games", gameId);
        const gameSnap = await getDoc(gameRef);
        if (!gameSnap.exists()) {
          console.error("Game not found!");
          return;
        }
        const totalQues = gameSnap.data().ques;

        const teamRef = doc(db, "games", gameId, "team", `Team:${teamName}`);
        let teamSnap = await getDoc(teamRef);

        if (!teamSnap.exists()) {

        const placeholders = Array.from({ length: totalQues }, (_, i) => ({
            id: i + 1,
            text: `Question ${i + 1}`,
            chosen: null,        
            correctAnswer: null,   
            isCorrect: null 
        }));  

          await setDoc(teamRef, {
            score: 0,
            ques: totalQues,
            question:placeholders
          });
          teamSnap = await getDoc(teamRef);
        }

        setData({
          game: gameSnap.data(),
          team: teamSnap.data(),
        });
      } catch (err) {
        console.error(err);
      }
    };

    setTeam();
  }, [gameId, teamName]);

  const questionButton = (game,team,q) =>{
    navigate(`/questions/${game}/${team}/${q}`)
  }

      const back = () => {
        navigate(-1);
    }
    
  return (
    <>
      {data && (
        <div>
          <div className="profile-name">
            {data.game.name} &#9679; Team {teamName}
          </div>
          <div className="back" onClick={back}>&lt; Back</div>
          <div className="questions">
            {data.team.question?.map((q) => (
                    <div key={q.id} className="question-box" onClick={()=>questionButton(gameId,teamName,q.id)} > {q.id}. {q.text}<span className="arrow">&gt;</span></div>                 
            ))}
            </div>

        </div>
      )}
    </>
  );
}

export default Team;

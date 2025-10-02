import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";
import { db } from "./firebase.js";
import { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import "./Full.css";
// import Question from './questions.jsx'


function Question(){

    const {game,team,q} = useParams();
    const [text,setText] = useState('');
    const [options,setOptions] = useState([])
    const [answer,setAnswer] = useState('');
 useEffect(() => {
  const fetchQuestion = async () => {
    const teamId = `Team:${team}`;
    const ref = doc(db, 'games', game, 'team', teamId);

    const queRef = doc(db, 'games', game, 'team', teamId, 'question', `ques:${q}`);

    try {
      const refSnap = await getDoc(ref);
      if (!refSnap.exists()) alert("Team doc doesn't exist");

      const snapQue = await getDoc(queRef);
      if(!snapQue.exists()){
            setDoc(queRef,{
                question:text,
                options:options,
                answer:answer
            })
      }
      
    } catch (err) {
      console.error(err);
    }
  };

  fetchQuestion();
}, [game, team, q]);


    return(
        <>
        <div className="question-number">Question:{q}</div>
        <div className="back">&lt; Back</div>
        <label id="q-label" htmlFor="question">Question</label>
        <input id="q-input" type="text" value={text} onChange={(e) => setText(e.target.value)}></input>
        <div className="options-container">
            {Array.from({length:4}).map((_,i) => (
                <div key={i} className="options-box">
                    <label>Option {i+1}</label>
                    <input
                        type="text"
                        value = {options[i] || ''}
                        onChange = {(e) => {
                            const newOptions = [...options];
                            newOptions[i] = e.target.value;
                            setOptions(newOptions);
                        }}
                    />
                </div>
            ))}
        </div>         
        </>
    )
}
export default Question
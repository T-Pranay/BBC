import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";
import { db } from "./firebase.js";
import { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import "./css/Full.css";
// import Question from './questions.jsx'


function Question(){
    const navigate = useNavigate();

    const {game,team,q} = useParams();
    const [text,setText] = useState('');
    const [options,setOptions] = useState([])
    const [answer,setAnswer] = useState('');
    const [temptext,setTemptext] = useState("");
    const [refer,setRefer] = useState('');
    const [time,setTime] = useState('');

 useEffect(() => {
  const fetchQuestion = async () => {
    setTemptext("Fetching question...")
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
                answer:answer,
                time : time,
                reference : refer
            })
      } else if(snapQue.exists()){
         const data = snapQue.data();
         setAnswer(data.answer);
         setText(data.question);
         setOptions(data.options || ["", "", "", ""]);
         setRefer(data.reference);
         setTime(data.time)

        // if (Array.isArray(data.options)) {
        //     setOptions(data.options);
        // } else {
        //     setOptions([]); 
        // }
      }
      setTemptext("")
    } catch (err) {
      console.error(err);
    }
  };

  fetchQuestion();
}, [game, team, q]);

    const back = () => {
        navigate(-1);
    }

    const quesSubmit = async ()=>{
        if (
            !text.trim() ||
            !["1", "2", "3", "4"].includes(answer.trim()) ||
            !Array.isArray(options) ||
            options.length !== 4 ||
            options.some(opt => !opt || !opt.trim()) ||
            isNaN(Number(answer)) ||
            Number(answer) < 1 ||
            Number(answer) > 4 ||
            !time.trim() ||
            !refer.trim()
        ) {
            setTemptext("Please enter valid fields")
            setTimeout(()=>{
            setTemptext('')
            },4000)
            return;
        }
        try {
            setTemptext("Updated question successfully")
            setTimeout(()=>{
                setTemptext('')
            },4000)

            const teamId = `Team:${team}`;
            const docRef = doc(db, 'games', game, 'team', teamId, 'question', `ques:${q}`);
            const snap = await getDoc(docRef);
            if (!snap.exists()) {
                alert('Doc doesnt exist')
            }
            await setDoc(docRef,{            
                question:text,
                options:options,
                answer:answer,
                time : time,
                reference : refer
            },{merge:true})

            // update teams page question 
            const teamPage = doc(db, 'games', game, 'team', teamId);
            const teamSnap = await getDoc(teamPage);
            if (!teamSnap.exists()) {
                alert('Doc doesnt exist')
            }

            const data = teamSnap.data();
            let questions = data.question || [];
            if (questions[q-1]) {
                questions[q-1] = {...questions[q-1],
                    text: text,
                    correctAnswer: answer
            }
            await setDoc(teamPage, { question: questions }, { merge: true });
            console.log('updated')
        }


        } catch (err) {
            console.log(err)
        }
    }

    return(
        <>
            {temptext && (
                <div className="temp-text">{temptext}</div>
            )}    

                
            <div className="q-page">
                <div className="question-number">Question: {q}</div>
                <div className="back" onClick={back}>&lt; Back</div>
                <label id="q-label" htmlFor="question">Question</label>
                <textarea id="q-input" placeholder="Type your question here" type="text" value={text}
                    onChange={(e)=> {setText(e.target.value)}}></textarea>
                <div className="options-container">
                    {Array.from({length:4}).map((_,i) => (
                    <div key={i} className="options-box">
                        <label id="options">Option {i+1}</label>
                        <textarea id="o-text" type="text" value={options[i] || '' } onChange={(e)=> {
                            const newOptions = [...options];
                            newOptions[i] = e.target.value;
                            setOptions(newOptions);
                        }}
                    />
                </div>
            ))}
        </div>  
            <div className="extras">
                <label id="e-label" htmlFor="correct"> Set correct option</label> 
                <input type="number" id="correct" className="e-inputs" placeholder="1 or 2 or 3 or 4" value={answer} onChange={(e) => {setAnswer(e.target.value)}} />     
                <label id="e-label" htmlFor="ref"> Set Reference</label> 
                <input type="text" id="ref" className="e-inputs" value={refer} onChange={(e) => {setRefer(e.target.value)}} />           
                <label id="e-label" htmlFor="time"> Set Timer for question</label> 
                <input type="number" id="time" className="e-inputs" placeholder="value in seconds" value={time} onChange={(e) => {setTime(e.target.value)}} />                            
            </div>
            <button className="q-submit" onClick={quesSubmit}>Submit</button>

            {/* -------------- */}
            <div className="some"></div>            
            </div>
        </>
    )
}
export default Question
import { useState } from "react";
import "./css/Full.css";
import Play from './play.jsx'
import Game from './game.jsx'
import Score from './score.jsx'

function Dashboard({ setIsLoggedIn }) {

  const [active, setActive] = useState("game");

  return (
    <>
        <div className="welcome">Dashboard</div>
        <div className="dashboard-container">
            <header className="options">
                <ul className="list">
                    <li id="game" className={active === "game" ? "active" : ""} onClick={() => setActive("game")}>Game</li>
                    <li id="score" className={active === "score" ? "active" : ""} onClick={() => setActive("score")}>Score</li>
                    <li id="play" className={active === "play" ? "active" : ""}onClick={() => setActive("play")}>Play</li>
                </ul>
            </header>
        </div>

   
      <main>
        {active === "game" && <Game />}
        {active === "score" && <Score />}
        {active === "play" && <Play />}
      </main>  
    </>
  );
}

export default Dashboard;

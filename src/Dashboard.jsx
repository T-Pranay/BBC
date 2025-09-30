import { useState } from "react";
import "./Full.css";
import Play from './play.jsx'
import Game from './game.jsx'
import Teams from './teams.jsx'

function Dashboard({ setIsLoggedIn }) {

  const [active, setActive] = useState("game");

  return (
    <>
        <div className="welcome">Dashboard</div>
        <div className="dashboard-container">
            <header className="options">
                <ul className="list">
                    <li id="game" className={active === "game" ? "active" : ""} onClick={() => setActive("game")}>Game</li>
                    <li id="teams" className={active === "teams" ? "active" : ""} onClick={() => setActive("teams")}>Teams</li>
                    <li id="play" className={active === "play" ? "active" : ""}onClick={() => setActive("play")}>Play</li>
                </ul>
            </header>
        </div>

   
      <main>
        {active === "game" && <Game />}
        {active === "teams" && <Teams />}
        {active === "play" && <Play />}
      </main>  
    </>
  );
}

export default Dashboard;

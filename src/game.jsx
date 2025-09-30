import { useState,useEffect } from "react"
import "./Full.css"
function Game(){
    return(
        <>
            <div className="add-game">
                <svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" height="20px" viewBox="0 0 344.339 344.339"
                    xml:space="preserve">
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
        </>
    )
}

export default Game
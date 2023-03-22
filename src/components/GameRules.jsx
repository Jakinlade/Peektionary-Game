import React from "react";


function GameRules() {
    return (
        <div id="game-rules">
            <h1>How to Play</h1>
                <p>1. Select difficulty level</p>
                <ul>
                    <li>Easy: The answer is one word. Either an animal or food.</li>
                    <li>Medium: The answer is two words. The first is a color and the second is an animal or food.</li>
                    <li>Difficult: The answer is three words. The first is a color. The second and third are an animal, food, or profession.</li>
                </ul>
        </div>
    );
}

export default GameRules;
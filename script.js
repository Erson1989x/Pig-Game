
// Selecting elements
const playerOne = document.querySelector(".player--0");
const playerTwo = document.querySelector(".player--1");
const scoreOne = document.querySelector("#score--0");
const scoreTwo = document.getElementById("score--1");
const currentOne = document.getElementById("current--0");
const currentTwo = document.getElementById("current--1");
const gameDice = document.querySelector(".dice");
const buttonNew = document.querySelector(".btn--new");
const buttonRoll = document.querySelector(".btn--roll");
const buttonHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;

const initialState = () => {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    currentOne.textContent = 0;
    currentTwo.textContent = 0;
    scoreOne.textContent = 0;
    scoreTwo.textContent = 0;
    
    playerOne.classList.remove("player--winner");
    playerTwo.classList.remove("player--winner");
    playerOne.classList.add("player--active");
    playerTwo.classList.remove("player--active");
    gameDice.classList.add("hidden");

}

initialState();



const switchPlayer = () => {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    playerOne.classList.toggle("player--active");
    playerTwo.classList.toggle("player--active");
}

// Rolling dice functionality

const rollButton = () => {

    if (playing) {
   

    // 1. Generating a random dice roll
const dice = Math.trunc(Math.random() * 6) + 1;
console.log(dice);
    // 2. Display the dice
gameDice.classList.remove("hidden");
gameDice.src = `dice-${dice}.png`;
    // 3. Check for rolled 1 - if true, switch to next player
if (dice !== 1) {
    // Add dice to current score
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
} else {
    // Switch to next player
    switchPlayer();
}

}
     
}
    

const holdButton = () => {

    if (playing) {
    // Add current score to active player's score
    scores[activePlayer] += currentScore;
    // score[1] = score[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    // Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
        // Finish the game
        playing = false;
        gameDice.classList.add("hidden");
        document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
        document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
    } else {
    // Switch to next player
    switchPlayer();
}
    }

}

// Adding event listeners

buttonNew.addEventListener('click', ()=>initialState());
buttonRoll.addEventListener('click', rollButton);
buttonHold.addEventListener('click', holdButton);

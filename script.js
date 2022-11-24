'use strict';

// selecting elements
const score0El = document.querySelector(`#score--0`);
const score1El = document.getElementById(`score--1`);
const currentScore0El = document.querySelector(`#current--0`);
const currentScore1El = document.getElementById(`current--1`);

const diceEl = document.querySelector(`.dice`);

const rollBtn = document.querySelector(`.btn--roll`);

const newBtn = document.querySelector(`.btn--new`);

const holdBtn = document.querySelector(`.btn--hold`);

const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);

//starting conditions

let scores;

let currentScore;

let activePlayer;

let playing;

const init = function () {
  scores = [0, 0];

  currentScore = 0;

  activePlayer = 0;

  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add(`hidden`);
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  player0El.classList.remove(`player--winner`);
  player1El.classList.remove(`player--winner`);
  player0El.classList.add(`player--active`);
  player1El.classList.remove(`player--active`);
};

init();

const switchingPlayers = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  currentScore = 0;

  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle(`player--active`);
  player1El.classList.toggle(`player--active`);
};

//rolling dice functionality
rollBtn.addEventListener(`click`, function () {
  if (playing) {
    //1. generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2. display dice
    diceEl.classList.remove(`hidden`);

    diceEl.src = `dice-${dice}.png`;

    //3 check for rolled 1, if true, switch to next player

    if (dice !== 1) {
      //add dice to current score
      currentScore += dice;

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      switchingPlayers();
    }
  }
});

holdBtn.addEventListener(`click`, function () {
  if (playing) {
    // add current score to active players score
    scores[activePlayer] += currentScore;
    // scores [1] = scores[1]+currentScore
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    //check if score is 100 if so finish the game

    if (scores[activePlayer] >= 100) {
      //finish the game

      playing = false;

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
      diceEl.classList.add(`hidden`);
    }
    //switch to next player

    switchingPlayers();
  }
});

newBtn.addEventListener(`click`, init);

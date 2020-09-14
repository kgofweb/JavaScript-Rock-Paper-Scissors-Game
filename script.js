// DOM elements
const restart = document.getElementById('restart');
const score = document.getElementById('score');
const choices = document.querySelectorAll('.choice');
const modal = document.querySelector('.modal');
const result = document.getElementById('result');

// ScoreBoard
const scoreBoard = {
   player: 0,
   computer: 0
}

// Events listener
choices.forEach(choice => {
   choice.addEventListener('click', play);
});
restart.addEventListener('click', restartGame);
restart.addEventListener('click', rippleEffect);
window.addEventListener('click', clearModal);

// Main Func
function play(event) {
   // Show restart btn
   restart.style.display = 'inline-block';
   // Get player choice
   const playerChoice = event.target.id;
   // Get computer choice
   const computerChoice = getComputerChoice();
   // Winner
   const winner = getWinner(playerChoice, computerChoice);
   // Call showWinner func
   showWinner(winner, playerChoice, computerChoice);
}

// Computer choice
function getComputerChoice() {
   const random = Math.random();
   
   if(random < 0.45) {
      return 'rock';
   } else if(random <= 0.75) {
      return 'paper';
   } else {
      return 'scissors';
   }
}

// Get player winner
function getWinner(playerChoice, computerChoice) {
   if(playerChoice === computerChoice) {
      return 'Draw';
   } else if(playerChoice === 'rock') {
      // Computer choice
      if(computerChoice === 'paper') {
         return 'computer';
      } else {
         return 'player';
      }
   } else if(playerChoice === 'paper') {
      if(computerChoice === 'scissors') {
         return 'computer';
      } else {
         return 'player';
      }
   } else if(playerChoice === 'scissors') {
      if(computerChoice === 'rock') {
         return 'computer';
      } else {
         return 'player';
      }
   }
}

// Show result
function showWinner(winner, playerChoice, computerChoice) {
   if(winner === 'player') {
      // Increment player score
      scoreBoard.player++;

      // Show result
      result.innerHTML = `
         <div class='player-choice'>
            <h6>Player</h6>
            <i class="far fa-hand-${playerChoice} fa-5x"></i>
            <p>You choose <b>${playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)}</b></p>
         </div>
         <h1 class='text-win'>You win</h1>
         <div class='computer-choice'>
            <h6>Computer</h6>
            <i class="far fa-hand-${computerChoice} fa-5x"></i>
            <p>Computer choose <b>${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}</b></p>
         </div>
      `;
   } else if(winner === 'computer') {
      // Inc computer score
      scoreBoard.computer++;

      // Show result
      result.innerHTML = `
         <div class='player-choice'>
            <h6>Player</h6>
            <i class="far fa-hand-${playerChoice} fa-5x"></i>
            <p>You choose <b>${playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)}</b></p>
         </div>
         <h1 class='text-lose'>You lose</h1>
         <div class='computer-choice'>
            <h6>Computer</h6>
            <i class="far fa-hand-${computerChoice} fa-5x"></i>
            <p>Computer choose <b>${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}</b></p>
         </div>
      `;
   } else {
      // Draw
      result.innerHTML = `
         <div class='player-choice'>
            <h6>Player</h6>
            <i class="far fa-hand-${playerChoice} fa-5x"></i>
            <p>You choose <b>${playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)}</b></p>
         </div>
         <h1 class='text-draw'>Draw</h1>
         <div class='computer-choice'>
            <h6>Computer</h6>
            <i class="far fa-hand-${computerChoice} fa-5x"></i>
            <p>Computer choose <b>${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}</b></p>
         </div>
      `;
   }

   // Show Score
   score.innerHTML = `
      <p>Player: ${scoreBoard.player}</p>
      <p>Computer: ${scoreBoard.computer}</p>
   `;

   // Show modal
   modal.style.display = 'block';
}

// Restart game
function restartGame() {
   scoreBoard.player = 0;
   scoreBoard.computer = 0;

   score.innerHTML = `
      <p>Player: 0</p>
      <p>Computer: 0</p>
   `;
}

// Clear Modal
function clearModal(e) {
   if(e.target == modal) {
      modal.style.display = 'none';
   }
}

// Ripple Effect
function rippleEffect(event) {
   let circle = document.createElement('div');
   circle.classList.add('ripple');

   // Append child
   restart.appendChild(circle);

   // Set click position mouseEvent
   circle.style.left = event.clientX - this.offsetLeft + 'px';
   circle.style.top = event.clientY - this.offsetTop + 'px';
   circle.style.transform = 'translate(-50%, -50%) scale(0)';
}
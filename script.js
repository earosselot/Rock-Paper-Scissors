const resultsDiv = document.querySelector('#results');
// const runningScoreDiv = document.querySelector('#running-score');('
const marker = document.querySelector('#marker');
const playerRunningScore = document.querySelector('#player-score');
const computerRunningScore = document.querySelector('#computer-score');
const buttons = document.querySelectorAll('.rps');
const reset_btn = document.querySelector('#reset');
const playerCartoon = document.querySelector('#player-cartoon');
const computerCartoon = document.querySelector('#computer-cartoon');


let playerScore = 0;
let computerScore = 0;
let result = 2;        


function computerPlay() {
    const number = Math.trunc(Math.random()*3);
    let computer
    if (number === 0) {
        computer = 'rock';
    } else if (number === 1) {
        computer = 'paper';
    } else {
        computer = 'scissors'
    }
    return computer
}


function playRound(playerSelection, computerSelection) {
    let win = 2;
    playerSelection = playerSelection.toLowerCase();
    if (playerSelection != computerSelection) {
        if (playerSelection === 'rock') {
            if (computerSelection === 'paper'){
                win = 0;
            } else {
                win = 1;
            }
        } else if (playerSelection === 'paper') {
            if (computerSelection === 'scissors') {
                win = 0;
            } else {
                win = 1;
            }
        } else {
            if (computerSelection === 'rock') {
                win = 0;
            } else {
                win = 1;
            }
        }
    }
    console.log(win)
    return win
}


function endGame() {
    buttons.forEach((button) => {
        button.style.display = 'none';
    })
    reset_btn.style.display = 'block';
}


function setImage(slot, image) {
    if (image === 'rock') {
        slot.textContent = '&#9994';
    } else if (image === 'paper'){
        slot.textContent = '&#9995;';
    } else if (image === 'scissors') {
        slot.textContent = '&#9996;';
    }
    // slot.src = `images/${image}_cartoon.png`;
}

buttons.forEach((button) => {
    
    button.addEventListener('click', () => {
        let playerSelection = button.getAttribute('id');
        let computerSelection = computerPlay();
        result = playRound(playerSelection, computerSelection);

        setImage(computerCartoon, computerSelection);
        setImage(playerCartoon, playerSelection);

        marker.style.display = 'block';
                
        if (result === 1) {
            playerScore += 1;
            resultsDiv.textContent = `${playerSelection} beats ${computerSelection}! \n player wins the round`;
        } else if (result === 0) {
            computerScore += 1;
            resultsDiv.textContent = `${computerSelection} beats ${playerSelection}! \n computer wins the round`;
        } else {
            resultsDiv.textContent = `That was a draw on ${playerSelection}`;
        }

        playerRunningScore.textContent = `Your score: ${playerScore}`;
        computerRunningScore.textContent = `${computerScore} :Computer Score`;
        // runningScoreDiv.textContent = `playerScore: ${playerScore}, computerScore: ${computerScore}`;

        if (playerScore === 5) {
            resultsDiv.textContent = 'player wins the game!';
            endGame();
        } else if (computerScore === 5) {
            resultsDiv.textContent = 'computer wins the game!';
            endGame();
        }           

    })
})


reset_btn.addEventListener('click', () => {
    playerScore = 0;
    computerScore = 0;
    reset_btn.style.display = 'none';
    buttons.forEach((button) => {
        button.style.display = 'block';
    })
    resultsDiv.textContent = 'New game';
    runningScoreDiv.textContent = '';
})

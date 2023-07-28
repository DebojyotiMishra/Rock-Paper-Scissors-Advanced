let score = JSON.parse(localStorage.getItem("score")) || {
    wins: 0,
    losses: 0,
    ties: 0
};

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
    if (!isAutoPlaying) {
        intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1090)
        isAutoPlaying = true;
    } else {
        clearInterval(intervalId);
        isAutoPlaying = false;
    }

    if (document.querySelector('.js-auto-play').innerHTML === "Auto Play") {
        document.querySelector('.js-auto-play').innerHTML = 'Stop Playing';
    } else if (document.querySelector('.js-auto-play').innerHTML === 'Stop Playing') {
        document.querySelector('.js-auto-play').innerHTML = "Auto Play";
    }
}

function pickComputerMove() {
    let randomNumber = Math.random();
    let computerMove;

    if (randomNumber >= 0 && randomNumber < 1/3) {
        computerMove = 'Rock';
    } else if(randomNumber >= 1/3 && randomNumber < 2/3) {
        computerMove = "Paper";
    } else if(randomNumber >= 2/3 && randomNumber < 1) {
        computerMove = "Scissors";
    }

    return computerMove;
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
    playGame('Rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
    playGame('Paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
    playGame('Scissors');
});

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r' || event.key === 'R') {
        playGame('Rock');
    } else if (event.key === 'p' || event.key === 'P') {
        playGame('Paper');
    } else if (event.key === 's' || event.key === 'S') {
        playGame('Scissors');
    }
});

function playGame(playerMove) {
    let computerMove = pickComputerMove();
    let result;

    if(playerMove === 'Rock') {
        if(computerMove === 'Rock') {
            result = "Its a Tie"
        }
        else if(computerMove === 'Scissors') {
            result = 'You Win!';
        }
        else if(computerMove === 'Paper') {
            result = 'You Lose'
        }
    } else if (playerMove === 'Paper') {
        if (computerMove === 'Paper') {
            result = 'Its a Tie';
        } else if (computerMove === 'Scissors') {
            result = 'You Lose';
        } else if (computerMove === 'Rock') {
            result = 'You Win!';
        }

    } else if (playerMove === 'Scissors') {
        if (computerMove === 'Rock') {
            result = 'You Lose';
        } else if (computerMove === 'Paper') {
            result = 'You Win!';
        } else if (computerMove === 'Scissors') {
            result = 'Its a Tie';
        }
    }

    if (result === 'You Win!') {
        score.wins += 1;
    } else if (result === 'You Lose') {
        score.losses += 1;
    } else if (result === 'Its a Tie') {
        score.ties += 1;
    }

    localStorage.setItem("score", JSON.stringify(score))

    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-result-compare').innerHTML = `Your Move: <img src = "./images/${playerMove}.png" width = "40px"> : <img src = "./images/${computerMove}.png" width = "40px"> Computer`;
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}
const icons = [
    "🐱","🐶","🦊","🐼","🐸","🐵","🦄","🐙"
];
let cards = [...icons, ...icons];
let firstCard, secondCard;
let lockBoard = false;
let moves = 0;
let matches = 0;
let time = 0;
let timerInterval;

const movesCounter = document.getElementById('moves');
const timeCounter = document.getElementById('time');
const gameContainer = document.getElementById("game");


function shuffle(array){
    for(let i = array.length -1; i>0; i--){
        let j = Math.floor(Math.random()*(i+1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
shuffle(cards);

function createBoard(){
    cards.forEach(icon => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <div class="card-inner">
                <div class = "front"></div>
                <div class = "back">${icon}</div>
            </div>
        `;
        card.addEventListener("click",flipCard);
        gameContainer.appendChild(card);
    })
}

function startTimer(){
    timerInterval = setInterval(() => {
        time++;
        timeCounter.textContent = time;
    }, 1000);
}

function flipCard(){

    if(lockBoard || this === firstCard) return;
    if(!timerInterval) startTimer();

    this.classList.add("flipped");

    if(!firstCard){
        firstCard = this;
        return;
    }

    secondCard = this;
    moves++;
    movesCounter.textContent = moves;
    checkMatch();
}

function resetBoard(){
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

function endGame(){
    clearInterval(timerInterval);
    document.getElementById("final-moves").textContent = moves;
    document.getElementById("final-time").textContent = time;
    document.getElementById("popup").classList.remove("hidden");
}

function disableCards(){
    matches++;
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    firstCard.removeEventListener("click",flipCard);
    secondCard.removeEventListener("click",flipCard);
    resetBoard();
    if(matches === icons.length){
        endGame();
    }
}

function unflipCards(){
    lockBoard = true;
    setTimeout(()=>{
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        resetBoard();
    },3000);
}

function checkMatch(){
    let isMatch = firstCard.querySelector(".back").textContent === secondCard.querySelector(".back").textContent;
    isMatch ? disableCards() : unflipCards();
}

document.getElementById("restart").addEventListener("click", ()=> location.reload());
document.getElementById("play-again").addEventListener("click", ()=> location.reload());




createBoard();
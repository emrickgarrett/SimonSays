//Code for the Simon Says Game!

function playSound(e){
	if(isSimonPlaying || isGameOver) return;

	const audio = document.querySelector(`audio[data-key="${this.dataset.key}"]`);
	if(!audio) return;

	audio.currentTime = 0;
	audio.play();

	checkPlayerMove(this.dataset.key);
}

function removeHighlight(e){
	if(e.propertyName === "opacity"){
		if(this.classList.contains("simon-playing1")){
			this.classList.remove("simon-playing1");
		}
		if(this.classList.contains("simon-playing2")){
			this.classList.remove("simon-playing2");
		}
		if(this.classList.contains("simon-playing3")){
			this.classList.remove("simon-playing3");
		}
		if(this.classList.contains("simon-playing4")){
			this.classList.remove("simon-playing4");
		}
	}
}

function changeDifficulty(e){
	difficultyButtons.forEach(button => {
		if(button.classList.contains("btn-selected")){
			button.classList.remove("btn-selected");
		}
	});
	this.classList.add("btn-selected");
	console.log("Difficulty: " + this.dataset.key);
	difficultyMultiplier = difficultyMultipliers[this.dataset.key];
}

function startClicked(e){
	setInterval(function(){gameLoop();}, 200)
	this.disabled = true;
	isGameOver = false;
	isSimonPlaying = false;
	isPlayerPlaying = false;
	isSimonsTurn = true;
	turn = 1;
	currentMove = 0;
	simonMoveList = [];
	simonIncrement = 3;
}

//variables to be used in the game loop
var simonMoveList = [];
var isSimonPlaying = false;
var isPlayerPlaying = false;
var isGameOver = true;
var isSimonsTurn = true;
var turn = 1;
var currentMove = 0;
var simonIncrement = 3;
const simonDefaultSpeed = 1000;
const simonDefaultIncrement = 3;
const simonMinimumSpeed = 200;
const simonIncrementSpeed = 4;
const difficultyMultipliers = [2, 4, 8, 16];
var difficultyMultiplier = difficultyMultipliers[1];

//Functions to be used in the game loop
function disableUserControls(){
	panels.forEach(note => {
		if(note.classList.contains("active"))
			note.classList.remove("active");
	});
	isSimonPlaying = true;
}

function enableUserControls(){
	panels.forEach(note => {
		if(!note.classList.contains("active"))
			note.classList.add("active");
	});
}

function generateMove(){
	//generate rando number
	const random = Math.floor((Math.random() * 4));
	switch(random){
		case 0:
			simonMoveList.push("red");
			break;
		case 1:
			simonMoveList.push("blue");
			break;
		case 2:
			simonMoveList.push("green");
			break;
		case 3:
			simonMoveList.push("yellow");
			break;
		default:
			console.log("Error generating move");
			break;
	}


}

function playSimonSound(move, interval, i){
	const audio = document.querySelector(`audio[data-key="${move}"]`);
	const panel = document.querySelector(`div[data-key="${move}"]`);

	audio.currentTime = 0;
	audio.play();

	var panelLocation = 0;
	switch(move){
		case "red":
			panelLocation = 1;
			break;
		case "blue":
			panelLocation = 2;
			break;
		case "green":
			panelLocation = 3;
			break;
		case "yellow":
			panelLocation = 4;
			break;
	}

	panel.classList.add(`simon-playing${panelLocation}`);
	clearInterval(interval);

	if(i >= simonMoveList.length-1){
		endSimonsTurn();
	}

}

function playMoves(){
	//Minimum MoveSpeed is 200 ms, or else it's impossible to play
	var moveSpeed = simonDefaultSpeed - (turn * simonIncrement * difficultyMultiplier);
	moveSpeed = (moveSpeed >= 200)? moveSpeed : 200;
	simonMoveList.forEach((move,i) =>{
		console.log(move);
		console.log(i);
		console.log(moveSpeed);
		var interval = setInterval(function(){playSimonSound(move, interval, i)}, moveSpeed);
		var moveSpeedAdd = simonDefaultSpeed - (turn * simonIncrement * difficultyMultiplier);
		moveSpeed += (moveSpeedAdd >= 200)? moveSpeedAdd : 200;
	});
}

function checkPlayerMove(key){
	if(key === simonMoveList[currentMove]){
		currentMove++;
	}else{
		gameOver();
	}
	if(currentMove >= simonMoveList.length){
		//end turn
		endPlayerTurn();
		currentMove = 0;
		turn++;
		simonIncrement += simonIncrementSpeed;
	}
}

function simonTurn(){
	isSimonPlaying = true;
	disableUserControls();
	generateMove();
	playMoves();
}

function endSimonsTurn(){
	isSimonsTurn = false;
	isSimonPlaying = false;
	console.log("Ending Simon's Turn");
}

function playerTurn(){
	isPlayerPlaying = true;
	enableUserControls();
}

function endPlayerTurn(){
	isPlayerPlaying = false;
	isSimonsTurn = true;
}

function gameOver(){
	isGameOver = true;
	disableUserControls();
	clearInterval();

	//Let player restart the game!
	startButton.disabled = false;
	startButton.value = "Restart?";
}

function gameLoop(){
	if(!isGameOver){
		if(!isSimonPlaying){
			if(isSimonsTurn){
				simonTurn();
			}else{
				if(!isPlayerPlaying){
					playerTurn();
				}
			}

		}
	}
}


const panels = Array.from(document.querySelectorAll(".panel"));
const difficultyButtons = Array.from(document.querySelectorAll(".btn"));
const startButton = document.querySelector(".btn-start");

panels.forEach(note => note.addEventListener('click', playSound));
panels.forEach(note => note.addEventListener('transitionend', removeHighlight));

difficultyButtons.forEach(button => button.addEventListener('click', changeDifficulty));

startButton.addEventListener('click', startClicked);

//Code for the Simon Says Game!

function playSound(e){
	if(isSimonPlaying) return;

	const audio = document.querySelector(`audio[data-key="${this.dataset.key}"]`);
	if(!audio) return;

	audio.currentTime = 0;
	audio.play();

	checkPlayerMove(this.dataset.key);
}

//Got to remove the highlight after simon has played the note!
function removeHighlight(e){
	//TODO more elegant way of removing classes from the elements
	if(e.propertyName === "opacity"){
		if(this.classList.contains("simon-playing1")){
			this.classList.remove("simon-playing1");
			console.log("Simon was playing, now he is not");
		}
		if(this.classList.contains("simon-playing2")){
			this.classList.remove("simon-playing2");
			console.log("Simon was playing, now he is not");
		}
		if(this.classList.contains("simon-playing3")){
			this.classList.remove("simon-playing3");
			console.log("Simon was playing, now he is not");
		}
		if(this.classList.contains("simon-playing4")){
			this.classList.remove("simon-playing4");
			console.log("Simon was playing, now he is not");
		}
	}
}

//variables to be used in the game loop
var simonMoveList = [];
var isSimonPlaying = false;
var isPlayerPlaying = false;
var isSimonsTurn = true;
var turn = 1;
var currentMove = 0;
const simonPossibleMoves = ["red", "blue", "green", "yellow"];
const simonDefaultSpeed = 1000;
const simonIncrementSpeed = 50;
const difficultyMultipliers = [1, 2, 4, 8];
const difficultyMultiplier = difficultyMultipliers[1];
const difficultyText = ["Easy", "Normal", "Hard", "Insane"];

//Functions to be used in the game loop
function disableUserControls(){
	//Remove hover class from panels
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
	const random = Math.floor((Math.random() * 3));
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
			simonMoveList.push("blue");
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
	var moveSpeed = simonDefaultSpeed - (turn * simonIncrementSpeed * difficultyMultiplier);

	simonMoveList.forEach((move,i) =>{
		console.log(move);
		console.log(i);
		console.log(moveSpeed);
		var interval = setInterval(function(){playSimonSound(move, interval, i)}, moveSpeed);
		moveSpeed += simonDefaultSpeed - (turn * simonIncrementSpeed * difficultyMultiplier);
	});
}

function checkPlayerMove(key){
	if(key === simonMoveList[currentMove]){
		//Yes!
		currentMove++;
	}else{//u dun fukt up sun.
		gameOver();
	}
	if(currentMove >= simonMoveList.length){
		//end turn
		endPlayerTurn();
		currentMove = 0;
		turn++;
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
	//TODO handle the game over case
	console.log("You lose :(");
}

function gameLoop(){
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


const panels = Array.from(document.querySelectorAll(".panel"));
console.log(panels);
console.log(panels[0].dataset.key);

panels.forEach(note => note.addEventListener('click', playSound));
panels.forEach(note => note.addEventListener('transitionend', removeHighlight));



setInterval(function(){gameLoop();}, 200)
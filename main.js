//Code for the Simon Says Game!

function playSound(e){
	if(isSimonPlaying) return;

	const audio = document.querySelector(`audio[data-key="${this.dataset.key}"]`);
	if(!audio) return;

	audio.currentTime = 0;
	audio.play();
}

//Got to remove the highlight after simon has played the note!
function removeHighlight(e){
	//TODO
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

var simonMoveList = ["green", "blue", "yellow"];
var isSimonPlaying = false;
var isPlayerPlaying = false;
var isSimonsTurn = true;
var turn = 1;
const simonPossibleMoves = ["red", "blue", "green", "yellow"];
const simonDefaultSpeed = 1000;
const simonIncrementSpeed = .1;
const difficultyMultipliers = [1, 2, 4, 8];
const difficultyMultiplier = difficultyMultipliers[0];
const difficultyText = ["Easy", "Normal", "Hard", "Insane"];

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
	console.log("I am here");
}

function generateMove(){
	//TODO create meaningful move generation
	simonMoveList.push("red");
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
	var moveSpeed = simonDefaultSpeed * (turn + simonIncrementSpeed) / difficultyMultiplier;

	simonMoveList.forEach((move,i) =>{
		console.log(move);
		console.log(i);
		console.log(moveSpeed);
		var interval = setInterval(function(){playSimonSound(move, interval, i)}, moveSpeed);
		moveSpeed += 1000;
	});
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
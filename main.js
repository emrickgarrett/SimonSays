//Code for the Simon Says Game!

function playSound(e){
	//TODO don't play sound when Simon is playing!
	const audio = document.querySelector(`audio[data-key="${this.dataset.key}"]`);
	if(!audio) return;

	audio.currentTime = 0;
	audio.play();
}

//Got to remove the highlight after simon has played the note!
function removeHighlight(e){
	//TODO
}

var simonMoveList = {};
const simonPossibleMoves = ["red", "blue", "green", "yellow"];
const simonDefaultSpeed = 1;
const simonIncrementSpeed = .5;
const difficultyMultipliers = [1, 2, 4, 8];
const difficultyText = ["Easy", "Normal", "Hard", "Insane"];

function simonTurn(){

}

function gameLoop(){

}


const panels = Array.from(document.querySelectorAll(".panel"));
console.log(panels);
console.log(panels[0].dataset.key);

panels.forEach(note => note.addEventListener('click', playSound));
panels.forEach(note => note.addEventListener('transitionend', removeHighlight));




import { initialisePlayers } from "./player.js";
import Board from "./board.js";
import { toggleActionButtons } from "./actions.js";

let board;

window.onload = function () {
	var boardContainer = document.querySelector(".board-container");

	boardContainer.addEventListener("click", function(event) {
		if (event.target !== boardContainer && !event.target.classList.contains("back") && boardContainer.contains(event.target)) {
			toggleCardSelected(event);
		}
		});

	startGame();
};

function toggleCardSelected(event) {
	let element = event.target;
	if (!element.classList.contains("selected")) {
		element.classList.add("selected");
	} else {
		element.classList.remove("selected");
	}


	//! probably replace with something more elegant - this call could get confusing since it's in actions.js
	toggleActionButtons();
}

function startGame() {
	board = new Board();
	board.initialiseBoard();
	initialisePlayers();
}
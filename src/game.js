import { initialisePlayers } from "./player.js";
import Board from "./board.js";
import { initialiseActions, toggleActionButtons } from "./actions.js";
import { players } from './player.js';

let board;
let playerInfo;
export let handContainer;

window.onload = function () {
	var boardContainer = document.querySelector(".board-container");
	playerInfo = document.getElementById("player-info");
	handContainer = document.getElementById("hand-container");

	handContainer.addEventListener("click", function (event) {
		if (event.target !== handContainer && handContainer.contains(event.target)) {
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

//TODO: refactor UI stuff into UIHelper probably
export function updatePlayerUI() {
	playerInfo.innerText = `P1: ${players.p1.hitPoints}\nP2: ${players.p2.hitPoints}\nActive: ${players.active === players.p1 ? "P1" : "P2"}`;
}

function startGame() {
	board = new Board();
	board.initialiseBoard();
	initialisePlayers();
	initialiseActions();
	updatePlayerUI();
}
import Deck from "./deck.js";
import Player from "./player.js";
import Board from "./board.js"

const Actions = Object.freeze({
	BUY: "buy",
	BURN: "burn",
	DAMAGE: "damage",
	DISCARD: "discard"
});

const Colours = Object.freeze({
	RED: "red",
	BLACK: "black",
	MIX: "mix"
});

const actionButtons = [...document.getElementsByClassName("action")];

let board;
let	p1, p2, activePlayer;
const hitPoints = 40;

window.onload = function () {
	var parentDiv = document.querySelector(".board-container");
	parentDiv.addEventListener("click", toggleCardSelected);

	startGame();
};

function initialisePlayers() {
	let rStarters = new Deck(["♥", "♦"], ["2", "3", "4"]);
	let bStarters = new Deck(["♠", "♣"], ["2", "3", "4"]);

	p1 = new Player(hitPoints, rStarters.draw(3).concat(bStarters.draw(3)));
	p1.drawPile.shuffle();

	p2 = new Player(hitPoints, rStarters.draw(3).concat(bStarters.draw(3)));
	p2.drawPile.shuffle();

	p1.draw(4);
	p2.draw(4);

	console.log(`p1 hand: ${p1.hand.toString()}`);
	console.log(`p1 deck: ${p1.drawPile.toString()}`);
}

function toggleCardSelected(event) {
	let element = event.target;
	if (!element.classList.contains("selected")) {
		element.classList.add("selected");
	} else {
		element.classList.remove("selected");
	}

	toggleActionButtons();
}

function getSelectedCardsAsArray() {
	return [...document.getElementsByClassName("selected")];
}

function getCardColours(cards) {
	if (cards.every((card) => card.classList.contains(Colours.RED))) {
		return Colours.RED;
	} else if (cards.every((card) => card.classList.contains(Colours.BLACK))) {
		return Colours.BLACK;
	} else {
		return Colours.MIX;
	}
}

function getAvailableActions() {
	let cards = getSelectedCardsAsArray();
	console.log(cards);
	let actions = [];

	if (cards.length == 0) {
		return actions;
	}

	if (getCardColours(cards) == Colours.RED) {
		actions.push(Actions.BUY);
	}

	if (getCardColours(cards) == Colours.BLACK) {
		actions.push(Actions.DAMAGE);
	}

	if (cards.length <= 2) {
		actions.push(Actions.BURN);
	}

	return actions;
}

// called every time a card in hand is selected/deselected
function toggleActionButtons() {
	let actions = getAvailableActions();
	if (actions.length == 0) {
		actionButtons.forEach(button => button.hidden = true);
		return;
	}

	actionButtons.forEach(button => button.hidden = !actions.includes(button.id));
}

function burn(cards) {
	activePlayer.hand.remove(cards);
}

function buy() { 
	// add bought card to activePlayer's discard pile
}

function damage() { }

function startGame() {
	board = new Board();
	board.initialiseBoard();
	initialisePlayers();
}

activePlayer = p1;
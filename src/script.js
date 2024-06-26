import Deck from "./deck.js";
import Player from "./player.js";

const Actions = Object.freeze({
	BUY: "buy",
	BURN: "burn",
	DAMAGE: "damage"
});

const Colours = Object.freeze({
	RED: "red",
	BLACK: "black",
	MIX: "mix"
});

const rjSlot = document.querySelector(".board-pos.rj");
const rqSlot = document.querySelector(".board-pos.rq");
const rkSlot = document.querySelector(".board-pos.rk");

const bjSlot = document.querySelector(".board-pos.bj");
const bqSlot = document.querySelector(".board-pos.bq");
const bkSlot = document.querySelector(".board-pos.bk");

let rrPile, rjPile, rqPile, rkPile,
	brPile, bjPile, bqPile, bkPile,
	p1, p2, activePlayer;

const hitPoints = 40;

window.onload = function () {
	var parentDiv = document.querySelector(".board-container");
	parentDiv.addEventListener("click", toggleCardSelected);
};

function initialiseBoard() {
	rrPile = new Deck(["♥", "♦"], ["A", "5", "6", "7", "8", "9", "10"]);
	rjPile = new Deck(["♥", "♦"], ["J"]);
	rqPile = new Deck(["♥", "♦"], ["Q"]);
	rkPile = new Deck(["♥", "♦"], ["K"]);

	brPile = new Deck(["♠", "♣"], ["A", "5", "6", "7", "8", "9", "10"]);
	bjPile = new Deck(["♠", "♣"], ["J"]);
	bqPile = new Deck(["♠", "♣"], ["Q"]);
	bkPile = new Deck(["♠", "♣"], ["K"]);

	rjSlot.appendChild(rjPile.cards[0].getHTML());
	rqSlot.appendChild(rqPile.cards[0].getHTML());
	rkSlot.appendChild(rkPile.cards[0].getHTML());
	bjSlot.appendChild(bjPile.cards[0].getHTML());
	bqSlot.appendChild(bqPile.cards[0].getHTML());
	bkSlot.appendChild(bkPile.cards[0].getHTML());
}

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

	toggleAvailableActions();
}

function getSelectedCardsAsArray() {
	return [...document.getElementsByClassName("selected")];
}

function getCardColours(cards) {
	if (cards.every((card) => card.classList.contains(Colours.RED))) {
		return Colours.RED;
	} else if (selectedCards.every((card) => card.classList.contains(Colours.BLACK))) {
		return Colours.BLACK;
	} else {
		return Colours.MIX;
	}
}

function getAvailableActions() {
	let cards = getSelectedCardsAsArray();
	let actions = [];

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

// ? call every time a card in hand is selected/deselected
// function toggleActionButtons() {
// 	let actions = getAvailableActions();	
// }

// ? make it so buttons only appear when you have the appropriate cards selected ?
// ? i.e. each time a card is selected/deselected, update the button ?
function burn(cards) {
	activePlayer.hand.remove(cards);
}

function buy() { }

function damage() { }

function startGame() {
	initialiseBoard();
	initialisePlayers();
}

startGame();

activePlayer = p1;
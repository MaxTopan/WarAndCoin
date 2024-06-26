const SUITS = ["♠", "♣", "♥", "♦"];
const VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

export default class Deck {
	constructor(suits = SUITS, values = VALUES, startShuffled = true) {
		this.cards = newDeck(suits, values);
		if (startShuffled) {
			this.shuffle();
		}
	}

	// used to create a deck of specific cards
	static setCards(cards) {
		let deck = new Deck([], []);
		if (cards != null) {
			deck.add(cards);
		}
		return deck;
	}

	// convert contents of deck to string
	toString() {
		let cards = "";
		for (let i = 0; i < this.numOfCards; i++) {
			cards += this.cards[i].toString() + ", ";
		}

		return cards;
	}

	get numOfCards() {
		return this.cards.length;
	}

	// adds specified cards to the deck
	add(toAdd) {
		if (toAdd instanceof Card) {
			this.cards.push(toAdd);
			return;
		}
		for (let card of toAdd) {
			this.cards.push(card);
		}
	}

	// remove specified cards from the deck
	remove(toRemove) {
		if (toRemove instanceof Card) {
			let index = this.cards.indexOf(toRemove);
			if (index != -1) this.cards.splice(index, 1);
			return;
		}
		for (let card of toRemove) {
			let index = this.cards.indexOf(card);
			this.cards.splice(index, 1);
		}
	}
	
	// draw @num cards from the top of the deck
	draw(num = 1) {
		let drawn = [];
		for (let i = 0; i < num; i++) {
			drawn.push(this.cards.shift());
		}
		return drawn;
	}

	// fisher-yates shuffle
	shuffle() {
		for (let i = this.numOfCards - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
			[this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
		}
	}
}

export class Card {
	constructor(suit, value) {
		this.suit = suit;
		this.value = value;
	}

	toString() {
		return `${this.suit}${this.value}`;
	}

	get color() {
		return this.suit == "♠" || this.suit == "♣" ? "black" : "red";
	}

	getHTML() {
		const cardDiv = document.createElement("div");
		cardDiv.innerText = this.suit;
		cardDiv.classList.add("card", this.color);
		cardDiv.dataset.value = `${this.value} ${this.suit}`;
		return cardDiv;
	}
}

function newDeck(suits, values) {
	return suits.flatMap((suit) => {
		return values.map((value) => {
			return new Card(suit, value);
		});
	});
}
/* ATTEMPTING TO IMPLEMENT FACE CARD SHILED VALUES */
// class FaceCard extends Card {
//     constructor(suit, value) {
//         super(suit, value);
//         switch (this.value){
//             case "J":
//                 this.shield = 5;
//                 break;
//             case "Q":
//                 this.shield = 10;
//                 break;
//             case "K":
//                 this.shield = 15;
//                 break;
//         default:
//             console.error(`Invalid value for face card: ${this.value}`)
//         }
//     }
// }

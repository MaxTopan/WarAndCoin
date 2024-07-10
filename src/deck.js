const SUITS = ["♠", "♣", "♥", "♦"];
const VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const VALUEMAP = { "A": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10, "J": 11, "Q": 12, "K": 13 };

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

	get length() {
		return this.cards.length;
	}

	get isEmpty() {
		return this.cards.length == 0;
	}

	// convert contents of deck to string
	toString() {
		let cards = "";
		for (let i = 0; i < this.length; i++) {
			cards += this.cards[i].toString() + ", ";
		}

		return cards;
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
		if (toRemove instanceof Card || toRemove instanceof HTMLDivElement)
			toRemove = [toRemove];

		// check if array contains html cards or Card objects
		if (toRemove[0] instanceof Card) {
			// cards must be multiple Card objects
			for (let card of toRemove) {
				let index = this.getCardIndex(card);
				if (index != -1) this.cards.splice(index, 1);
			}
			return;
		}

		//if (toRemove[0] instanceof HTMLDivElement) {
		for (let card of toRemove) {
			let index = this.htmlGetCardIndex(card);
			if (index != -1) this.cards.splice(index, 1);
		}
		return;
		//}
	}

	htmlGetCardIndex(card) {
		return this.cards.findIndex(element => element.value == card.dataset.value && element.suit == card.dataset.suit);
	}

	getCardIndex(card) {
		return this.cards.findIndex(element => element.value == card.value && element.suit == card.suit);
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
		for (let i = this.length - 1; i > 0; i--) {
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
		cardDiv.dataset.valuesuit = `${this.value} ${this.suit}`;
		cardDiv.dataset.value = `${this.value}`;
		cardDiv.dataset.suit = `${this.suit}`;
		cardDiv.dataset.rank = `${VALUEMAP[this.value]}`;
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

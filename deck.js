const SUITS = ["♠", "♣", "♥", "♦"];
const VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

export default class Deck {
    constructor(suits = SUITS, values = VALUES, startShuffled = true){
        this.cards = newDeck(suits, values);
        if (startShuffled) {
            this.shuffle();
        }
    }

    // used to create a deck of specific cards
    static setCards(cards) { 
        let deck = new Deck([],[]);
        deck.push(cards);
        return deck;
    }

    get numOfCards(){
        return this.cards.length;
    }

    push(toAdd) {
        if (typeof(toAdd) == Card) {
            this.cards.push(toAdd);
            return;
        }
        for (let i = 0; i < toAdd.length; i++) {
            this.cards.push(toAdd[i]);
        }
    }

    draw(num = 1) {
        let drawn = [];
        for (let i = 0; i < num; i++) {
            drawn.push(this.cards.shift());
        }
        return drawn;
    }

    // fisher-yates shuffle
    shuffle(){
        for (let i = this.numOfCards - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }
}

class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
    }

    get color() {
        return this.suit == "♠" || this.suit == "♣" ? 'black' : 'red';
    }

    getHTML() {
        const cardDiv = document.createElement('div');
        cardDiv.innerText = this.suit;
        cardDiv.classList.add("card", this.color);
        cardDiv.dataset.value = `${this.value} ${this.suit}`
        return cardDiv;
    }
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


function newDeck(suits, values) {
    return suits.flatMap(suit =>{
        return values.map(value =>{
            return new Card(suit, value)
        })
    })
}
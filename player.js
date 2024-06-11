import Deck from "./deck.js"

// create player class
// players have 3 decks: drawPile, hand, discardPile

export default class Player {
    constructor(drawPile, hand = new Deck([],[]), discardPile = new Deck([],[])) {
        this.drawPile = Deck.setCards(drawPile);
        this.hand = hand
        this.discardPile = discardPile
    }
}
import Deck from "./deck.js"

export default class Player {
    constructor(hitPoints, drawPile, hand = [], discardPile = []) {
        this.hitPoints = hitPoints;
        this.drawPile = Deck.setCards(drawPile);

        this.hand = Deck.setCards(hand);
        this.discardPile = Deck.setCards(discardPile);
        this.selectedCards = [];
    }

    draw(num = 1) {
        this.hand.push(this.drawPile.pop(num));
    }

    select (cards) {
        
    }

    // play() {

    // }

    discardHand() {
        this.discardPile.push(this.hand.cards);
    }
}
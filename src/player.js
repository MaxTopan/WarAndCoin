import Deck from "./deck.js"

const hitPoints = 40;

export default class Player {
    constructor(hitPoints, drawPile, hand = [], discardPile = []) {
        this.hitPoints = hitPoints;
        this.drawPile = Deck.setCards(drawPile);

        this.hand = Deck.setCards(hand);
        this.discardPile = Deck.setCards(discardPile);
        this.selectedCards = [];
    }

    draw(num = 1) {
        this.hand.add(this.drawPile.draw(num));
    }

    select(cards) {

    }

    // play() {

    // }

    discardHand() {
        this.discardPile.add(this.hand.cards);
    }
}

export function initialisePlayers() {
    let p1, p2;

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

    return [p1, p2];
}
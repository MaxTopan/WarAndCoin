import Deck from "./deck.js"

const hitPoints = 40;
export const players = { p1: null, p2: null };
export let activePlayer;

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

    let rStarters = new Deck(["♥", "♦"], ["2", "3", "4"]);
    let bStarters = new Deck(["♠", "♣"], ["2", "3", "4"]);

    players.p1 = new Player(hitPoints, rStarters.draw(3).concat(bStarters.draw(3)));
    players.p1.drawPile.shuffle();

    players.p2 = new Player(hitPoints, rStarters.draw(3).concat(bStarters.draw(3)));
    players.p2.drawPile.shuffle();

    players.p1.draw(4);
    players.p2.draw(4);

    console.log(`p1 hand: ${players.p1.hand.toString()}`);
    console.log(`p1 deck: ${players.p1.drawPile.toString()}`);

    activePlayer = players.p1;
}
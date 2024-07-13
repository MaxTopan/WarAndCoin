import Deck from "./deck.js"
import { handContainer } from "./game.js"

const hitPoints = 40;
export const players = { p1: null, p2: null, active: null, inactive: null };

export default class Player {
    constructor(hitPoints, drawPile = [], hand = [], discardPile = []) {
        this.hitPoints = hitPoints;
        this.drawPile = Deck.setCards(drawPile);

        this.hand = Deck.setCards(hand);
        this.handSize = 4;
        this.discardPile = Deck.setCards(discardPile);
        this.selectedCards = [];
    }

    drawToFull(num = this.handSize) {
        let numToDraw = num - this.hand.length;
        this.draw(numToDraw);
    }

    draw(num = 1) {
        for (let i = 0; i < num; i++) {
            if (this.drawPile.isEmpty) {
                this.drawPile.add(this.discardPile.draw(this.discardPile.length));
                this.drawPile.shuffle();
            }

            this.hand.add(this.drawPile.draw());
        }
    }

    discard(cards) {
        this.discardPile.add(cards);
        this.hand.remove(cards);
    }

    discardHand() {
        this.discard(this.hand.cards);
    }

    loseHealth(num) {
        //TODO: update once shields are introduced
        this.hitPoints -= num;
    }

    //* this can be optimised, but for now w/e it's fine
    //! do something like getting all cards in hand, filter using .card and remove any that need removing add any that need adding
    updateHand() {
        let cards = document.querySelectorAll(".hand");
        cards.forEach(card => {
            card.classList.remove("hand");
            handContainer.removeChild(card);
        })

        this.hand.cards.forEach(card => {
            let cardDiv = card.getHTML();
            cardDiv.classList.add("hand");
            handContainer.appendChild(cardDiv);
        });
    }
}

export function toggleActivePlayer() {
    [players.active, players.inactive] = [players.inactive, players.active];
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

    players.active = players.p1;
    players.inactive = players.p2;

    players.active.updateHand();
}
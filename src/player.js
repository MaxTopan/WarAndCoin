import Deck from "./deck.js"
import { handContainer } from "./game.js"

const hitPoints = 40;
export const players = { p1: null, p2: null };
export let activePlayer;

export default class Player {
    constructor(hitPoints, drawPile = [], hand = [], discardPile = []) {
        this.hitPoints = hitPoints;
        this.drawPile = Deck.setCards(drawPile);

        this.hand = Deck.setCards(hand);
        this.discardPile = Deck.setCards(discardPile);
        this.selectedCards = [];
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

    discardHand() {
        this.discardPile.add(this.hand.draw(this.hand.length));
    }

    //* this can be optimised, but for now w/e it's fine
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

    activePlayer.updateHand();
}
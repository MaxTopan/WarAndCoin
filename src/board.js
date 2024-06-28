import Deck from "./deck.js";

export default class Board {
    constructor() {
        this.rjSlot = null;
        this.rqSlot = null;
        this.rkSlot = null;
        this.bjSlot = null;
        this.bqSlot = null;
        this.bkSlot = null;

        // red, black
        // ranks, jack, queen, king
        this.rrPile = new Deck(["♥", "♦"], ["A", "5", "6", "7", "8", "9", "10"]);
        this.rjPile = new Deck(["♥", "♦"], ["J"]);
        this.rqPile = new Deck(["♥", "♦"], ["Q"]);
        this.rkPile = new Deck(["♥", "♦"], ["K"]);
        
        this.brPile = new Deck(["♠", "♣"], ["A", "5", "6", "7", "8", "9", "10"]);
        this.bjPile = new Deck(["♠", "♣"], ["J"]);
        this.bqPile = new Deck(["♠", "♣"], ["Q"]);
        this.bkPile = new Deck(["♠", "♣"], ["K"]);
    }

    initialiseBoard() {
        this.rjSlot = document.querySelector(".board-pos.rj");
        this.rqSlot = document.querySelector(".board-pos.rq");
        this.rkSlot = document.querySelector(".board-pos.rk");
        this.bjSlot = document.querySelector(".board-pos.bj");
        this.bqSlot = document.querySelector(".board-pos.bq");
        this.bkSlot = document.querySelector(".board-pos.bk");

        this.rjSlot.appendChild(this.rjPile.cards[0].getHTML());
        this.rqSlot.appendChild(this.rqPile.cards[0].getHTML());
        this.rkSlot.appendChild(this.rkPile.cards[0].getHTML());
        this.bjSlot.appendChild(this.bjPile.cards[0].getHTML());
        this.bqSlot.appendChild(this.bqPile.cards[0].getHTML());
        this.bkSlot.appendChild(this.bkPile.cards[0].getHTML());
    }
}
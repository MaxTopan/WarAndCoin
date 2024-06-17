import Deck from "./deck.js";
import Player from "./player.js";

const rjSlot = document.querySelector('.board-pos.rj');
const rqSlot = document.querySelector('.board-pos.rq');
const rkSlot = document.querySelector('.board-pos.rk');

const bjSlot = document.querySelector('.board-pos.bj');
const bqSlot = document.querySelector('.board-pos.bq');
const bkSlot = document.querySelector('.board-pos.bk');

let rrPile, rjPile, rqPile, rkPile,
    brPile, bjPile, bqPile, bkPile,
    p1, p2;
const hitPoints = 40;

function initialiseBoard() {
    rrPile = new Deck(["♥", "♦"], ["A", "5", "6", "7", "8", "9", "10"]);
    rjPile = new Deck(["♥", "♦"], ["J"]);
    rqPile = new Deck(["♥", "♦"], ["Q"]);
    rkPile = new Deck(["♥", "♦"], ["K"]);

    brPile = new Deck(["♠", "♣"], ["A", "5", "6", "7", "8", "9", "10"]);
    bjPile = new Deck(["♠", "♣"], ["J"]);
    bqPile = new Deck(["♠", "♣"], ["Q"]);
    bkPile = new Deck(["♠", "♣"], ["K"]);

    rjSlot.appendChild(rjPile.cards[0].getHTML());
    rqSlot.appendChild(rqPile.cards[0].getHTML());
    rkSlot.appendChild(rkPile.cards[0].getHTML());
    bjSlot.appendChild(bjPile.cards[0].getHTML());
    bqSlot.appendChild(bqPile.cards[0].getHTML());
    bkSlot.appendChild(bkPile.cards[0].getHTML());
}

function initialisePlayers() {
    let rStarters = new Deck(["♥", "♦"], ["2", "3", "4"]);
    let bStarters = new Deck(["♠", "♣"], ["2", "3", "4"]);

    p1 = new Player(hitPoints, rStarters.pop(3).concat(bStarters.pop(3)));
    p1.drawPile.shuffle();

    p2 = new Player(hitPoints, rStarters.pop(3).concat(bStarters.pop(3)));
    p2.drawPile.shuffle();

    p1.draw(4);
    p2.draw(4);

    console.log(p1);
    console.log(`p1 hand: ${p1.hand.toString()}`);
    console.log(`p1 deck: ${p1.drawPile.toString()}`);
}

function takeTurn(player) {
    // select/deselect cards

    // choose an action to do with them:
    // burn (must be 2 or less cards)
    // buy (must be red only)
    // damage (must be black only)

    // choose whether to discard hand

    // draw back to 4 cards
}

function burn() {

}

function buy() {

}

function damage() {

}



function startGame() {
    initialiseBoard();
    initialisePlayers();

}

startGame();

let activePlayer = p1;
takeTurn(activePlayer);

// console.log(p1.selectedCards);
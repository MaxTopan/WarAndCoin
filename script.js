import Deck from "./deck.js"

const rjSlot = document.querySelector('.board-pos.rj');
const rqSlot = document.querySelector('.board-pos.rq');
const rkSlot = document.querySelector('.board-pos.rk');

const bjSlot = document.querySelector('.board-pos.bj');
const bqSlot = document.querySelector('.board-pos.bq');
const bkSlot = document.querySelector('.board-pos.bk');

let rrPile, rjPile, rqPile, rkPile,
    brPile, bjPile, bqPile, bkPile,
    p1Deck, p2Deck, p1Hand, p2Hand;

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

function initialisePlayerDecks() {
     p1Hand = [];
     p2Hand = [];
     
     let rStarters = new Deck(["♥", "♦"], ["2", "3", "4"]);
     let bStarters = new Deck(["♠", "♣"], ["2", "3", "4"]);
     
     p1Deck = Deck.setCards(rStarters.draw(3).concat(bStarters.draw(3)));
     p1Deck.shuffle();
     p2Deck = Deck.setCards(rStarters.draw(3).concat(bStarters.draw(3)));
     p2Deck.shuffle();

     console.log(p1Deck);
     console.log(p2Deck); 
}

function startGame() {
    initialiseBoard();
    initialisePlayerDecks();
   
}
startGame()


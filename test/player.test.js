/*
* @jest-environment jsdom
*/

import Player, {initialisePlayers, activePlayer, players} from '../src/player.js';
import Deck from '../src/deck.js';

describe('Player class', () => {
    let player;
    let drawStarters = new Deck(["♥"], ["2", "3", "4"]);
    beforeEach(() => {
        player = new Player(40, drawStarters.cards);
    });

    describe('Prelims', () =>{
        test('player should initialise correctly', () =>{
            expect(player.drawPile.length).toBe(3);
            expect(player.hitPoints).toBe(40);
        });
    });

    describe('Draw', () => {
        test('should move single card from draw pile to hand', () =>{
            expect(player.drawPile.length).toBe(3);
            
            let card = player.drawPile.cards[0];
            player.draw();
            
            expect(player.drawPile.length).toBe(2);
            expect(player.drawPile.cards).not.toContain(card);
            expect(player.hand.cards).toContain(card);
        });

        test('should move multiple cards from draw pile to hand', () =>{
            expect(player.drawPile.length).toBe(3);
            
            let cards = [player.drawPile.cards[0], player.drawPile.cards[1]];
            player.draw(2);
            
            expect(player.drawPile.length).toBe(1);
            cards.forEach(card => {
                expect(player.drawPile.cards).not.toContain(card);
                expect(player.hand.cards).toContain(card);
            });
        });

        test('should shuffle discard pile when drawing from an empty deck', () => {
            let discardStarters = new Deck(["♠"], ["2", "3", "4"]);
            player.discardPile.add(discardStarters.cards);

            expect(player.discardPile.length).toBe(3);
            expect(player.drawPile.length).toBe(3);

            player.draw(4);

            expect(player.discardPile.length).toBe(0);
            expect(player.drawPile.length).toBe(2);

            drawStarters.cards.forEach(card => {
                expect(player.drawPile.cards).not.toContain(card);
                expect(player.hand.cards).toContain(card);
            });
        });
    });

    describe('Discarding Hand', () =>{
        test('should move all cards from hand to discard pile', () => {
            expect(player.drawPile.length).toBe(3);
            expect(player.hand.length).toBe(0);
            expect(player.discardPile.length).toBe(0);

            player.draw(3);
            expect(player.drawPile.length).toBe(0);
            expect(player.hand.length).toBe(3);
            expect(player.discardPile.length).toBe(0);

            player.discardHand();
            expect(player.drawPile.length).toBe(0);
            expect(player.hand.length).toBe(0);
            expect(player.discardPile.length).toBe(3);
        });
    });
});
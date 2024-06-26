import Deck from '../src/deck.js';
import { Card } from '../src/deck.js';

describe('Deck class', () => {
    let deck;

    beforeEach(() => {
        deck = new Deck();
    });

    /// placeholder test ///
    test('should mock shuffle method', () => {
        deck.shuffle = jest.fn();
        deck.shuffle();
        expect(deck.shuffle).toHaveBeenCalled();
    });

    test('should instantiate deck once, then keep same deck', () => {
        let a = deck.cards.toString();
        let b = deck.cards.toString();

        expect(a).toEqual(b);
    });

    describe('remove', () => {
        test('should remove one card from deck', () => {
            let card = deck.cards[Math.floor(Math.random() * 52) + 1];
            let origLength = deck.cards.length;

            expect(deck.cards).toContainEqual(card);

            deck.remove(card);

            expect(deck.cards.length).toEqual(origLength - 1);
            expect(deck.cards).not.toContainEqual(card);
        });

        test('should remove multiple cards from deck', () => {
            let cards = deck.cards.slice(5, 10);
            let origLength = deck.cards.length;

            cards.forEach(card => expect(deck.cards).toContainEqual(card));

            deck.remove(cards);

            expect(deck.cards.length).toEqual(origLength - cards.length);
            cards.forEach(card => expect(deck.cards).not.toContainEqual(card));
        });

        test('should remove nothing if card specified is not in deck', () => {
            let origLength = deck.cards.length;
            let card = new Card("£", "1");
            
            expect(deck.cards).not.toContainEqual(card);
            expect(deck.cards.length).toEqual(52);

            deck.remove(card);

            expect(deck.cards).not.toContainEqual(card);
            expect(deck.cards.length).toEqual(52);
        });
    });

    describe('shuffle', () => {
        test('order should change', () => {
            let a = [...deck.cards];
            deck.shuffle();
            let b = [...deck.cards];

            expect(a).not.toEqual(b);
            expect(a.sort()).toEqual(b.sort());
        });

        test('number of cards should remain the same', () => {
            let a = [...deck.cards];
            deck.shuffle();
            let b = [...deck.cards];

            expect(a.length).toEqual(b.length);
        });
    });
})
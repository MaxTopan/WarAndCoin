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

    describe('add()', () => {
        test('should add one card to deck', () => {
            let origAmount = deck.length;
            let card = new Card("♠", "13");
            deck.add(card);

            expect(deck.length).toEqual(origAmount + 1);
            expect(deck.cards).toContainEqual(card);
        });

        test('should add multiple cards to deck', () => {
            let cardA = new Card("♠", "13");
            let cardB = new Card("♠", "14");
            let cardC = new Card("♠", "15");
            let cards = [[cardA, cardB, cardC]];

            let origAmount = deck.length;

            deck.add(cards);

            expect(deck.length).toEqual(origAmount + cards.length);
            cards.forEach(card => expect(deck.cards).toContainEqual(card));
        });
    });

    describe('remove()', () => {
        test('should remove one card from deck', () => {
            let card = deck.cards[Math.floor(Math.random() * 52) + 1];
            let origLength = deck.length;

            expect(deck.cards).toContainEqual(card);

            deck.remove(card);

            expect(deck.length).toEqual(origLength - 1);
            expect(deck.cards).not.toContainEqual(card);
        });

        test('should remove new card from deck', () => {
            let card = new Card("♠", "A");
            let origLength = deck.length;

            expect(deck.cards).toContainEqual(card);

            deck.remove(card);

            expect(deck.length).toEqual(origLength - 1);
            expect(deck.cards).not.toContainEqual(card);
        });

        test('should remove html card from deck', () => {
            let card = new Card("♠", "A");
            let htmlCard = card.getHTML();
            let origLength = deck.length;

            expect(deck.cards).toContainEqual(card);
            deck.remove(htmlCard);

            expect(deck.length).toEqual(origLength - 1);
            expect(deck.cards).not.toContainEqual(card);
        });

        test('should remove multiple cards from deck', () => {
            let cards = deck.cards.slice(5, 10);
            let origLength = deck.length;

            cards.forEach(card => expect(deck.cards).toContainEqual(card));

            deck.remove(cards);

            expect(deck.length).toEqual(origLength - cards.length);
            cards.forEach(card => expect(deck.cards).not.toContainEqual(card));
        });

        test('should remove nothing if card specified is not in deck', () => {
            let card = new Card("£", "1");

            expect(deck.cards).not.toContainEqual(card);
            expect(deck.length).toEqual(52);

            deck.remove(card);

            expect(deck.cards).not.toContainEqual(card);
            expect(deck.length).toEqual(52);
        });
    });

    describe('shuffle()', () => {
        test('should change order', () => {
            let a = [...deck.cards];
            deck.shuffle();
            let b = [...deck.cards];

            expect(a).not.toEqual(b);
            expect(a.sort()).toEqual(b.sort());
        });

        test('should not affect number of cards', () => {
            let a = [...deck.cards];
            deck.shuffle();
            let b = [...deck.cards];

            expect(a.length).toEqual(b.length);
        });
    });
})
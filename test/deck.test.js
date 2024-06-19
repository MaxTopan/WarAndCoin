import Deck from '../src/deck.js';

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

    describe('shuffle', () => {
        test('shuffle() should... shuffle cards', () => {
            let a = [...deck.cards];
            deck.shuffle();
            let b = [...deck.cards];

            expect(a).not.toEqual(b);
            expect(a.sort()).toEqual(b.sort());
        });
    });
})
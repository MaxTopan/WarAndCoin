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
})
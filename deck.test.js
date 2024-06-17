const deck = require('./deck.js')

test('makes a deck obj', () => {
    expect(deck.Deck).toBe(Deck);
});
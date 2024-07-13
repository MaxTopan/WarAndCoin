import { Actions, Colours } from './constants.js';
import { getCardColours, getSelectedCardsAsArray } from './cardHelpers.js';
import { players, toggleActivePlayer } from './player.js';
import { getCardObjects } from './deck.js';

export const actionButtons = [...document.getElementsByClassName("action")];
export const actions = { burn, buy, damage };

export function initialiseActions() {
    //! I'm so certain there's a better way to do this, but ¯\_(ツ)_/¯ it works for now
    actionButtons.forEach(button => {
        switch (button.id) {
            case "burn":
                button.onclick = burn;
                break;
            case "buy":
                button.onclick = buy;
                break;
            case "damage":
                button.onclick = damage;
                break;
        }
    });

    toggleActionButtons();
}

// called every time a card in hand is selected/deselected
export function toggleActionButtons() {
    let actions = getAvailableActions();
    if (actions.length == 0) {
        actionButtons.forEach(button => button.hidden = true);
        return;
    }

    actionButtons.forEach(button => button.hidden = !actions.includes(button.id));
}

function getAvailableActions() {
    let cards = getSelectedCardsAsArray();
    console.log(cards);
    let actions = [];

    if (cards.length == 0) {
        return actions;
    }

    if (getCardColours(cards) == Colours.RED) {
        actions.push(Actions.BUY);
    }

    if (getCardColours(cards) == Colours.BLACK) {
        actions.push(Actions.DAMAGE);
    }

    if (cards.length <= 2) {
        actions.push(Actions.BURN);
    }

    return actions;
}

function getValueTotal(cards) {
    let total = 0;
    cards.forEach(card => {total += Number(card.getAttribute('data-rank'))});
    return total;
}

function burn() {
    let cards = getSelectedCardsAsArray();
    players.active.hand.remove(cards);
    endTurn();
}

function buy() {
    let cards = getSelectedCardsAsArray();
    let total = getValueTotal(cards);
    console.log(`buy: ${total}`);
    // add bought card to active player's discard pile
    endTurn(cards);
}

function damage() {
    let cards = getSelectedCardsAsArray();
    let total = getValueTotal(cards);

    console.log(`damage: ${total}`);

    // take total off of other player's health
    players.inactive.loseHealth(total);

    endTurn(cards);
}

function endTurn(cardsUsed = []) {
    // move cards from hand to discard pile
    if (cardsUsed.length > 0) {
        players.active.discard(getCardObjects(cardsUsed));
    }

    players.active.drawToFull();

    console.log(`p1 health: ${players.p1.hitPoints}`);
    console.log(`p2 health: ${players.p2.hitPoints}`);

    // offer option to discard rest of hand
    
    toggleActivePlayer();    
    toggleActionButtons();
    players.active.updateHand();
}
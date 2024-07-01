import { Actions, Colours } from './constants.js';
import { getCardColours, getSelectedCardsAsArray } from './cardHelpers.js';

export const actionButtons = [...document.getElementsByClassName("action")];

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


export function burn(cards) {
    activePlayer.hand.remove(cards);
}

export function buy() {
    // add bought card to activePlayer's discard pile
}

export function damage() { }
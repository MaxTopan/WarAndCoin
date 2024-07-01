import { Actions, Colours } from './constants.js';
import { getCardColours, getSelectedCardsAsArray } from './cardHelpers.js';
import { players } from './player.js';
import Card from './deck.js'

export const actionButtons = [...document.getElementsByClassName("action")];
export const actions = { burn, buy, damage };

export function initialiseActions() {
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

function burn(cards) {
    console.log("burn called");
    //activePlayer.hand.remove(cards);
}

export function buy() {
    console.log("buy called");
    // add bought card to activePlayer's discard pile
}

function damage() {
    console.log("damage called");
}
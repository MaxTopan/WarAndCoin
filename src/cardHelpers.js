import { Colours } from './constants.js';

export function getCardColours(cards) {
	if (cards.every((card) => card.classList.contains(Colours.RED))) {
		return Colours.RED;
	} else if (cards.every((card) => card.classList.contains(Colours.BLACK))) {
		return Colours.BLACK;
	} else {
		return Colours.MIX;
	}
}

export function getSelectedCardsAsArray() {
	return [...document.getElementsByClassName("selected")];
}
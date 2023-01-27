import { v4 as uuid } from 'uuid';

import { Card } from '../app/modules/core/domain/entities/card.model.js';
import { Pokemon } from './types.js';

const generatePrice = (): number => {
	const MIN_PRICE = 50;
	const MAX_PRICE = 250;

	return Math.floor(Math.random() * (MAX_PRICE - MIN_PRICE + 1) + MIN_PRICE);
};

export const mapPokemonToCard = (pokemon: Pokemon): Card[] => {
	const CARD_AMOUNT = 5;
	const cardInstance = {
		name: pokemon.name,
		description:
			pokemon.description?.flavor_text_entries
				.filter((entry) => entry.language.name === 'en')
				.at(0)?.flavor_text ??
			`${pokemon.name} doesn't have a description yet.`,
		activeForSale: true,
		history: [],
		imageUrl: pokemon.sprites.front_default,
		price: generatePrice(),
	};

	return Array.from({ length: CARD_AMOUNT }).map(() => ({
		...cardInstance,
		uid: uuid(),
	}));
};

import { getDataFromAPI } from './api.js';
import { saveCards } from './db.js';
import { mapPokemonToCard } from './mapper.js';

const main = async () => {
	const resultsFromAPI = await getDataFromAPI();
	const cards = resultsFromAPI.flatMap(mapPokemonToCard);
	saveCards(cards);
};

main();

import axios from 'axios';
import * as https from 'https';

import { ExtraInfo, Pokemon, PokemonDescription } from './types.js';

const BASE_URL = 'https://pokeapi.co/api/v2';
const POKEMON_LIST_URL = `${BASE_URL}/pokemon?offset=0&limit=50`;
const POKEMON_DESCRIPTION_BASE_URL = `${BASE_URL}/pokemon-species`;

export const getDataFromAPI = (): Promise<Pokemon[]> => {
	axios.defaults.timeout = 60000;
	axios.defaults.httpAgent = new https.Agent({ keepAlive: true });

	return axios
		.get(POKEMON_LIST_URL)
		.then((result) => {
			const pokemonList: ExtraInfo[] = result.data?.results;
			const promiseList = pokemonList.map((slot) => {
				return axios.get<Pokemon>(slot.url);
			});
			return Promise.all(promiseList);
		})
		.then((results) => results.map((result) => result.data))
		.then((pokemon): Promise<Pokemon>[] =>
			pokemon.map((item) =>
				axios
					.get<PokemonDescription>(
						`${POKEMON_DESCRIPTION_BASE_URL}/${item.id}`,
					)
					.then((description) => {
						return {
							...item,
							description: description.data,
						};
					}),
			),
		)
		.then((promises) => Promise.all(promises));
};

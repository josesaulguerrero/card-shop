export interface Pokemon {
	id: number;
	name: string;
	description?: PokemonDescription;
	sprites: Sprites;
	stats: Stat[];
	types: Type[];
	abilities: Ability[];
	base_experience: number;
}

export interface Sprites {
	back_default: string;
	back_female: null;
	back_shiny: string;
	back_shiny_female: null;
	front_default: string;
	front_female: null;
	front_shiny: string;
	front_shiny_female: null;
	other: Other;
}

export interface Other {
	'official-artwork': OfficialArtwork;
}

export interface OfficialArtwork {
	front_default: string;
}

export interface Stat {
	base_stat: number;
	effort: number;
	stat: ExtraInfo;
}

export interface Type {
	slot: number;
	type: ExtraInfo;
}

export interface Ability {
	ability: ExtraInfo;
	is_hidden: boolean;
	slot: number;
}

export interface ExtraInfo {
	name: string;
	url: string;
}

// Description interfaces
export interface PokemonDescription {
	flavor_text_entries: FlavorTextEntry[];
	is_baby: boolean;
	is_legendary: boolean;
	is_mythical: boolean;
}

export interface FlavorTextEntry {
	flavor_text: string;
	language: ExtraInfo;
	version: ExtraInfo;
}

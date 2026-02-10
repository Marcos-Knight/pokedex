export interface PokemonListItem {
  id: number;
  name: string;
  image: string;
}


export interface PokemonDetails extends PokemonListItem {
  types: string[];
  height: number;
  weight: number;
  abilities: string[];
  stats: PokemonStat[];
  cry?: string;
}

export interface PokemonStat {
  name: string;
  value: number;
}

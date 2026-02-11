export interface PokemonDetailsDto {
  id: number;
  name: string;
  image: string;
  types: string[];
  height: number;
  weight: number;
  abilities: string[];
  stats: {
    name: string;
    value: number;
  }[];
  cry?: string;
}

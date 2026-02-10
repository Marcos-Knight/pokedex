import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";


@Injectable()
export class PokemonService {
  private readonly baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private readonly http: HttpService) { }

  async list(limit = 20, offset = 0) {
    const response = await firstValueFrom(
      this.http.get(`${this.baseUrl}/pokemon`, {
        params: { limit, offset },
      })
    );

    const results = response.data.results.map((pokemon) => {
      const id = this.extractIdFromUrl(pokemon.url);

      return {
        id,
        name: pokemon.name,
        image: this.getPokemonImage(id),
      };
    });

    return {
      count: response.data.count,
      results,
    };
  }


  async findByIdOrName(idOrName: string) {
  try {
    const response = await firstValueFrom(
      this.http.get(`${this.baseUrl}/pokemon/${idOrName.toLowerCase()}`)
    );

    const data = response.data;

    return {
      id: data.id,
      name: data.name,
      image:
        data.sprites.other?.['official-artwork']?.front_default ||
        data.sprites.front_default,
      types: data.types.map(t => t.type.name),

      height: data.height,
      weight: data.weight,

      abilities: data.abilities.map(a => a.ability.name),

      stats: data.stats.map(s => ({
        name: s.stat.name,
        value: s.base_stat,
      })),
    };
  } catch {
    return null;
  }
}


  private extractIdFromUrl(url: string): number {
    const parts = url.split('/').filter(Boolean);
    return Number(parts[parts.length - 1]);
  }

  async searchByName(name: string) {
    try {
      const response = await firstValueFrom(
        this.http.get(`${this.baseUrl}/pokemon/${name.toLowerCase()}`)
      );

      const data = response.data;

      return {
        id: data.id,
        name: data.name,
        image: data.sprites.front_default,
        types: data.types.map(t => t.type.name),
      };
    } catch (error) {
      return null;
    }
  }


  private getPokemonImage(id: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }

}

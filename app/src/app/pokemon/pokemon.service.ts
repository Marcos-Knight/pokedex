import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PokemonListItem, PokemonDetails } from './models/pokemon.models';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly apiUrl = `${environment.apiUrl}/pokemon`;

  constructor(private http: HttpClient) {}

  getPokemons(limit = 20, offset = 0): Observable<PokemonListItem[]> {
    const params = new HttpParams()
      .set('limit', limit)
      .set('offset', offset);

    return this.http.get<PokemonListItem[]>(this.apiUrl, { params });
  }

  searchPokemon(name: string): Observable<PokemonDetails> {
    return this.http.get<PokemonDetails>(`${this.apiUrl}/search`, {
      params: { name },
    });
  }

  getPokemonDetails(idOrName: string): Observable<PokemonDetails> {
  return this.http
    .get<any>(`${this.apiUrl}/${idOrName}`)
    .pipe(
      map(data => ({
        id: data.id,
        name: data.name,
        image: data.image,

        height: data.height ,
        weight: data.weight ,

        types: data.types,
        abilities: data.abilities,

        stats: data.stats.map((s: any) => ({
          name: s.name,
          value: s.value,
        })),

        cry: data.cry,        
      }))
    );
}

  }


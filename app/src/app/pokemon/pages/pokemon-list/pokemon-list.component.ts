import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from '../../pokemon.service';
import { PokemonListItem } from '../../models/pokemon.models';
import { finalize } from 'rxjs';


@Component({
    selector: 'app-pokemon-list',
    templateUrl: './pokemon-list.component.html',
    styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
    pokemons: PokemonListItem[] = [];
    errorMessage: string | null = null;

    limit = 20;
    offset = 0;

    loading = false;
    loadingMore = false;
    searching = false;
    empty = true;

    private scrollToBottom(): void {
        setTimeout(() => {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        }, 100);
    }


    searchTerm = '';

    constructor(
        private pokemonService: PokemonService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.loadPokemons();
    }

    loadPokemons(): void {
        console.log('loadPokemons called');
        this.loading = true;

        this.pokemonService
            .getPokemons(this.limit, this.offset)
            .pipe(
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe({
                next: (response: any) => {
                    console.log('API success', response);

                    this.pokemons = [...this.pokemons, ...response.results];
                    this.offset += this.limit;
                    this.empty = false;
                    if (this.offset > this.limit) {
                        this.scrollToBottom();
                    }
                },
                error: () => {
                    this.errorMessage = 'Failed to load Pokémon. Please try again.';
                    this.loading = false;
                }
                ,
            });
    }


    onSearch(): void {
        if (!this.searchTerm.trim()) {
            this.resetList();
            return;
        }

        this.searching = true;

        this.pokemonService.searchPokemon(this.searchTerm).subscribe({
            next: (pokemon) => {
                this.pokemons = [
                    {
                        id: pokemon.id,
                        name: pokemon.name,
                        image: pokemon.image,
                    },
                ];
                this.searching = false;
            },
            error: () => {
                this.pokemons = [];
                this.searching = false;
                this.empty = true;
            },
        });
    }

    resetList(): void {
        this.pokemons = [];
        this.offset = 0;
        this.loadPokemons();
    }

    clearSearch(): void {
        this.searchTerm = '';
        this.searching = false;
    }

    goToDetails(pokemon: PokemonListItem): void {
        this.router.navigate(['/pokemon', pokemon.id]);
    }
}

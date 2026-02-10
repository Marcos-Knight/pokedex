import { Routes } from '@angular/router';
import { PokemonListComponent } from './pokemon/pages/pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './pokemon/pages/pokemon-detail/pokemon-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: PokemonListComponent,
  },
  {
    path: 'pokemon/:id',
    component: PokemonDetailComponent,
  },
];

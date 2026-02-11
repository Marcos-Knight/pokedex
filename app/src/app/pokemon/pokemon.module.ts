import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PokemonDetailComponent } from './pages/pokemon-detail/pokemon-detail.component';
import { PokemonService } from './pokemon.service';
import { PokemonListComponent } from './pages/pokemon-list/pokemon-list.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PokemonListComponent,
    PokemonDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
  ],
  providers: [PokemonService],
  exports: [
    PokemonDetailComponent
  ]
})
export class PokemonModule {}

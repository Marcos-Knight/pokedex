import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../pokemon.service';
import { PokemonDetails } from '../../models/pokemon.models';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
})
export class PokemonDetailComponent implements OnInit {
  pokemon?: PokemonDetails;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.pokemonService.getPokemonDetails(id).subscribe({
        next: (data) => {
          console.log(data)
          this.pokemon = data;
        },
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  playSound(audioUrl?: string) {
  const audio = new Audio(audioUrl);
  audio.play();
}

}

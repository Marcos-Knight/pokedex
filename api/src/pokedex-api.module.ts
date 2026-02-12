import { Module } from '@nestjs/common';
import { PokemonModule } from './pokemon/pokemon.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PokemonModule,
    ConfigModule.forRoot({
      isGlobal: true
    })
  ],
})

export class PokedexApiModule { }

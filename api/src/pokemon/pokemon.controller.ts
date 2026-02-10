
import { Controller, Get, Param, Query, NotFoundException } from "@nestjs/common";
import { PokemonService } from "./pokemon.service";

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) { }

  @Get()
  list(
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    return this.pokemonService.list(limit, offset);
  }

  @Get('search')
  async search(@Query('name') name: string) {
    if (!name) {
      throw new NotFoundException('Pokemon name is required');
    }

    const pokemon = await this.pokemonService.findByIdOrName(name);

    if (!pokemon) {
      throw new NotFoundException('Pokemon not found');
    }

    return pokemon;
  }


  @Get(':id')
  async getDetails(@Param('id') id: string) {
    const pokemon = await this.pokemonService.findByIdOrName(id);

    if (!pokemon) {
      throw new NotFoundException('Pokemon not found');
    }

    return pokemon;
  }


}

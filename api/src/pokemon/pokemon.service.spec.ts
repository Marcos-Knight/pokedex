import { Test, TestingModule } from '@nestjs/testing';
import { PokemonService } from './pokemon.service';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { NotFoundException } from '@nestjs/common';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokemonService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PokemonService>(PokemonService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should convert height and weight correctly', async () => {
    const mockResponse = {
      data: {
        id: 8,
        name: 'wartortle',
        height: 10,
        weight: 225,
        sprites: {
          other: {
            'official-artwork': {
              front_default: 'image-url',
            },
          },
        },
        types: [],
        abilities: [],
        stats: [],
      },
    };

    jest.spyOn(httpService, 'get').mockReturnValue(of(mockResponse) as any);

    const result = await service.findByIdOrName('8');

    expect(result.height).toBe(1);   // se estiver convertendo no backend
    expect(result.weight).toBe(22.5);
  });

  it('should throw NotFoundException on 404', async () => {
    jest.spyOn(httpService, 'get').mockImplementation(() => {
      throw { response: { status: 404 } };
    });

    await expect(service.findByIdOrName('99999')).rejects.toThrow(
      NotFoundException,
    );
  });
});

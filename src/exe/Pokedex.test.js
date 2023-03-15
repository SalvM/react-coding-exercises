import React from 'react';
import { render, fireEvent, selectOptions, screen, wait, waitFor, within, getByRole, queryByRole } from '@testing-library/react';
import Pokedex from './Pokedex';
import userEvent from '@testing-library/user-event';
import { Autocomplete, TextField } from '@mui/material';
describe('Pokedex', () => {

  global.fetch = jest.fn(url => {
    if (url === 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0') {
      return Promise.resolve({
        json: () => Promise.resolve({ results: FAKE_POKEMON_LIST })
      });
    }
    if (url === 'https://pokeapi.co/api/v2/pokemon/blastoise') {
      return Promise.resolve({
        json: () => Promise.resolve(FAKE_POKEMON_DATA)
      });
    }
    return Promise.reject(new Error(`Unrecognized URL: ${url}`));
  })

  const FAKE_POKEMON_LIST = [
    {
      name: 'blastoise',
      url: 'https://pokeapi.co/api/v2/pokemon/9/'
    }
  ];

  const FAKE_POKEMON_DATA = {
    name: 'blastoise',
    order: 9,
    types: [
      {
        type: {
          name: 'water',
          url: 'https://pokeapi.co/api/v2/type/11/'
        }
      }
    ],
    stats: [
      {
        base_stat: 79,
        effort: 0,
        stat: {
          name: 'hp',
          url: 'https://pokeapi.co/api/v2/stat/1/'
        }
      },
      {
        base_stat: 83,
        effort: 0,
        stat: {
          name: 'attack',
          url: 'https://pokeapi.co/api/v2/stat/2/'
        }
      }
    ]
  };

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('fetches the pokemon list', async () => {
    render(<Pokedex />);

    await waitFor(() => expect(fetch).toBeCalledWith('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'));
  });
});
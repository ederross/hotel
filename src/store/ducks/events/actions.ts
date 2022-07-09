import {Types} from './types';
import {action} from 'typesafe-actions';

export const GetPokemons = ({page = 1, limit = 12}) => {
  return action(Types.GET_POKEMONS, {page, limit});
};

export const GetPokemonsSuccess = (pokemons: any[]) => {
  return action(Types.GET_POKEMONS_SUCCESS, {pokemons});
};

export const GetPokemonsFailure = (error: number) => {
  return action(Types.GET_POKEMONS_FAILURE, {error});
};

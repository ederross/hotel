import api from '../../../services';
import { put, call } from 'redux-saga/effects';
import { GetPokemonsSuccess, GetPokemonsFailure } from './actions';

export function* getPokemons({ payload }: any) {
  const { page, limit } = payload;
  try {
    const { data } = yield call(api.get, '/', {
      params: {
        limit,
        offset: limit * (page - 1),
      },
    });

    console.log('\x1b[32mGET_POKEMONS');
    yield put(GetPokemonsSuccess(data.results));
  } catch ({ message, response }) {
    if (!response) {
      console.log('\x1b[31mERRO NO GET_POKEMONS', message);
      yield put(GetPokemonsFailure(404));
      return;
    }

    console.log(`\x1b[31mERRO NO GET_POKEMONS [${message}]`);

    const { status } = response;
    yield put(GetPokemonsFailure(status));
  }
}

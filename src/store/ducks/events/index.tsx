import {Types} from './types';

const INITIAL_STATE = {
  data: [],
  loading: false,
  error: false,
};

const reducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case Types.GET_POKEMONS:
      return {...state, loading: true, error: false};
    case Types.GET_POKEMONS_SUCCESS:
      return {
        ...state,
        data: action.payload.pokemons,
        loading: false,
        error: false,
      };
    case Types.GET_POKEMONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export default reducer;

import { Types, TypesCheckout } from './types';

const INITIAL_STATE: TypesCheckout = {
  data: [],
  loading: false,
  error: false,
};

const reducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case Types.SET_CHECKOUT:
      return {
        ...state,
        data: action.payload.data,
        loading: true,
        error: false,
      };
    default:
      return state;
  }
};

export default reducer;

import { Types, TypesCart } from './types';

const INITIAL_STATE: TypesCart = {
  rooms: [
    {
      objectName: 'Standard',
      adults: 2,
      children: 1,
      quantity: 1,
      price: 98,
    },
    {
      objectName: 'Luxo',
      adults: 2,
      children: 2,
      quantity: 1,
      price: 125,
    },
  ],
  services: [
    {
      objectName: 'Passeio de balão',
      quantity: 2,
      price: 230,
    },
  ],
  loading: false,
  error: false,
};

const reducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case Types.ADD_CART_ROOM:
      const product = action?.payload?.room;
      const current = state?.rooms.filter((item) => item?.id !== product?.id);

      return {
        ...state,
        data: [...current, product],
        loading: true,
        error: false,
      };
    default:
      return state;
  }
};

export default reducer;

import { Types, TypesCart, CartRoom, CartService } from './types';

const INITIAL_STATE: TypesCart = {
  rooms: [],
  services: [],
  loading: false,
  error: false,
};

const reducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case Types.ADD_CART_ROOM:
      const room: CartRoom = action?.payload?.room;
      const current = state?.rooms.filter(
        (item) => item?.objectId !== room?.objectId
      );

      return {
        ...state,
        rooms: [...current, room],
        loading: true,
        error: false,
      };
    case Types.REMOVE_CART_ROOM:
      const objectId = action?.payload?.objectId;
      const removedRoom = state?.rooms.filter(
        (item) => item?.objectId !== objectId
      );

      return {
        ...state,
        rooms: [...removedRoom],
        loading: true,
        error: false,
      };
    case Types.ADD_CART_SERVICE:
      const service: CartService = action?.payload?.service;
      const currentServices = state?.services.filter(
        (item) => item?.serviceId !== service?.serviceId
      );

      return {
        ...state,
        services: [...currentServices, service],
        loading: true,
        error: false,
      };
    case Types.REMOVE_CART_SERVICE:
      const serviceId = action?.payload?.serviceId;
      const removedService = state?.services.filter(
        (item) => item?.serviceId !== serviceId
      );

      return {
        ...state,
        services: [...removedService],
        loading: true,
        error: false,
      };
    case Types.CLEAN_CART:
      return {
        ...state,
        rooms: [],
        services: [],
        loading: true,
        error: false,
      };
    default:
      return state;
  }
};

export default reducer;

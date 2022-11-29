import { Types, TypesCart, CartRoom, CartService } from './types';

const INITIAL_STATE: TypesCart = {
  endDate: '',
  startDate: '',
  objects: [],
  services: [],
  loading: false,
  error: false,
};

const reducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case Types.ADD_CART_ROOM:
      const object: CartRoom = action?.payload?.object;
      const current = state?.objects.filter(
        (item) => item?.objectId !== object?.objectId
      );

      return {
        ...state,
        objects: [...current, object],
        loading: true,
        error: false,
      };
    case Types.REMOVE_CART_ROOM:
      const objectId = action?.payload?.objectId;
      const removedRoom = state?.objects.filter(
        (item) => item?.objectId !== objectId
      );

      return {
        ...state,
        objects: [...removedRoom],
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
    case Types.SET_CART_INFOS:
      const hasChangeDate =
        action.payload.infos?.startDate !== state?.startDate ||
        action.payload.infos?.endDate !== state?.endDate;

      return {
        ...state,
        objects: !hasChangeDate ? state?.objects : [],
        services: !hasChangeDate ? state?.services : [],
        startDate: action.payload.infos?.startDate,
        endDate: action.payload.infos?.endDate,
        loading: false,
        error: false,
      };
    case Types.CLEAN_CART:
      return {
        ...state,
        objects: [],
        services: [],
        loading: true,
        error: false,
      };

    default:
      return state;
  }
};

export default reducer;

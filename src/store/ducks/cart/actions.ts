import { Types, CartRoom, CartService } from './types';
import { action } from 'typesafe-actions';

export const AddProductToCart = (object: CartRoom) => {
  console.log('ADD PRODUCT TO CART\n', object);
  return action(Types.ADD_CART_ROOM, { object });
};

export const RemoveProductToCart = (objectId: string) => {
  return action(Types.REMOVE_CART_ROOM, { objectId });
};

export const AddServiceToCart = (service: CartService) => {
  return action(Types.ADD_CART_SERVICE, { service });
};

export const RemoveServiceToCart = (serviceId: number) => {
  return action(Types.REMOVE_CART_SERVICE, { serviceId });
};

export const SetCartInfos = (infos: any) => {
  return action(Types.SET_CART_INFOS, { infos });
};

export const CleanCart = () => {
  return action(Types.CLEAN_CART, {});
};

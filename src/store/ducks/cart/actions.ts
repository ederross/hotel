import { Types } from './types';
import { action } from 'typesafe-actions';

export const AddProductToCart = (room: any) => {
  return action(Types.ADD_CART_ROOM, { room });
};

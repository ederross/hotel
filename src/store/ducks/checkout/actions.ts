import { Types, PaymethodTypes } from './types';
import { action } from 'typesafe-actions';

export const SetCheckoutRedux = (data: PaymethodTypes[]) => {
  return action(Types.SET_CHECKOUT, { data });
};

import { TypesCart } from './ducks/cart/types';
import { TypesCheckout } from './ducks/checkout/types';
import { TypesDomain } from './ducks/domain/types';

export interface AppStore {
  cart: TypesCart;
  domain: TypesDomain;
  checkout: TypesCheckout;
}

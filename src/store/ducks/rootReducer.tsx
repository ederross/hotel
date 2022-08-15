import { combineReducers } from 'redux';
import cart from './cart';
import domain from './domain';
import checkout from './checkout';

const reducers = combineReducers({
  cart,
  domain,
  checkout,
});

export default reducers;

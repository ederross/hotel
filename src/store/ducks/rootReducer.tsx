import { combineReducers } from 'redux';
import cart from './cart';
import domain from './domain';

const reducers = combineReducers({
  cart,
  domain,
});

export default reducers;

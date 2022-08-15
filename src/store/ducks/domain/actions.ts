import { Types, Domain } from './types';
import { action } from 'typesafe-actions';

export const SetIconsDomain = (icons: Domain) => {
  return action(Types.SET_ICON_DOMAIN, { icons });
};
export const SetContactDomain = (contact: Domain) => {
  return action(Types.SET_CONTACT_DOMAIN, { contact });
};

export const SetFacilitiesDomain = (facilities: Domain) => {
  return action(Types.SET_FACILITIES_DOMAIN, { facilities });
};

export const SetAmenitiesDomain = (amenities: Domain) => {
  return action(Types.SET_AMENITIES_DOMAIN, { amenities });
};

export const SetServicesDomain = (services: Domain) => {
  return action(Types.SET_SERVICES_DOMAIN, { services });
};

export const SetServicePricesDomain = (servicePrices: Domain) => {
  return action(Types.SET_SERVICEPRICES_DOMAIN, { servicePrices });
};

export const SetPaymethodDomain = (paymentMethodTypeDomain: Domain) => {
  return action(Types.SET_PAYMETHOD_DOMAIN, { paymentMethodTypeDomain });
};

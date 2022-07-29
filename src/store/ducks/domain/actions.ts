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

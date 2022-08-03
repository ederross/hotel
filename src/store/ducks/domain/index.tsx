import { Types, TypesDomain } from './types';

const INITIAL_STATE: TypesDomain = {
  amenitiesDomain: {
    data: [],
    links: {
      self: '',
      first: '',
      prev: '',
      next: '',
      last: '',
    },
    meta: {
      totalRecords: 0,
      totalPages: 0,
      requestDateTime: '',
    },
  },
  contactDomain: {
    data: [],
    links: {
      self: '',
      first: '',
      prev: '',
      next: '',
      last: '',
    },
    meta: {
      totalRecords: 0,
      totalPages: 0,
      requestDateTime: '',
    },
  },
  facilitiesDomain: {
    data: [],
    links: {
      self: '',
      first: '',
      prev: '',
      next: '',
      last: '',
    },
    meta: {
      totalRecords: 0,
      totalPages: 0,
      requestDateTime: '',
    },
  },
  iconsDomain: {
    data: [],
    links: {
      self: '',
      first: '',
      prev: '',
      next: '',
      last: '',
    },
    meta: {
      totalRecords: 0,
      totalPages: 0,
      requestDateTime: '',
    },
  },
  servicePriceDomain: {
    data: [],
    links: {
      self: '',
      first: '',
      prev: '',
      next: '',
      last: '',
    },
    meta: {
      totalRecords: 0,
      totalPages: 0,
      requestDateTime: '',
    },
  },
  serviceTypeDomain: {
    data: [],
    links: {
      self: '',
      first: '',
      prev: '',
      next: '',
      last: '',
    },
    meta: {
      totalRecords: 0,
      totalPages: 0,
      requestDateTime: '',
    },
  },
};

const reducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case Types.SET_ICON_DOMAIN:
      return { ...state, iconsDomain: action.payload.icons };
    case Types.SET_AMENITIES_DOMAIN:
      return { ...state, amenitiesDomain: action.payload.amenities };
    case Types.SET_CONTACT_DOMAIN:
      return { ...state, contactDomain: action.payload.contact };
    case Types.SET_FACILITIES_DOMAIN:
      return { ...state, facilitiesDomain: action.payload.facilities };
    case Types.SET_SERVICES_DOMAIN:
      return { ...state, serviceTypeDomain: action.payload.services };
    case Types.SET_SERVICEPRICES_DOMAIN:
      return { ...state, servicePriceDomain: action.payload.servicePrices };
    default:
      return state;
  }
};

export default reducer;

export const Types = {
  SET_ICON_DOMAIN: '@domain/SET_ICON_DOMAIN',
  SET_CONTACT_DOMAIN: '@domain/SET_CONTACT_DOMAIN',
  SET_FACILITIES_DOMAIN: '@domain/SET_FACILITIES_DOMAIN',
  SET_AMENITIES_DOMAIN: '@domain/SET_AMENITIES_DOMAIN',
};

export interface TypesDomain {
  iconsDomain: Domain;
  contactDomain: Domain;
  facilitiesDomain: Domain;
  amenitiesDomain: Domain;
  servicePriceDomain: Domain;
  serviceTypeDomain: Domain;
}

export interface Domain {
  data: DomainData[];
  links: {
    self: string;
    first: string;
    prev: string;
    next: string;
    last: string;
  };
  meta: {
    totalRecords: number;
    totalPages: number;
    requestDateTime: string;
  };
}

interface DomainData {
  domainItemCode: number;
  domainItemValue: string;
  active: boolean;
}

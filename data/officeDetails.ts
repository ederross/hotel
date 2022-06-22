export interface OfficeDetails {
  officeName: string;
  officeDescription: string;
  officeSlogan: string;
  propertyClassTypeCode: number;
  segmentTypeCode: number;
  locationTypeCode: number;

  contacts: Contacts[];

  address: {
    countryCode: string;
    stateCode: number;
    cityCode: number;
    streetName: number;
    streetNumber: string;
    neighborhoodName: number;
    postalCode: string;
    additionalInfo: string;

    latLong: {
      latitude: number;
      longitude: number;
    };
  };
}

interface Contacts {
  contactTypeCode: number;
  countryPhoneCode: string;
  phoneNumber: string;
}

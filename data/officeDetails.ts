export interface OfficeDetails {
  officeName: string;
  officeDescription: string;
  officeSlogan: string;
  propertyClassTypeCode: number;
  segmentTypeCode: number;
  locationTypeCode: number;

  contacts: any[];

  address: {
    countryCode: string;
    stateCode: number;
    cityCode: number;
    StateName: string;
    CityName: string;
    streetName: string;
    streetNumber: string;
    neighborhoodName: string;
    postalCode: string;
    additionalInfo: string;
    latLong: {
      latitude: number;
      longitude: number;
    };
  };
  publicKey: string;
}

interface Contacts {
  contactTypeCode: number;
  countryPhoneCode: string;
  phoneNumber: string;
}

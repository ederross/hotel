export interface Room {
  objectId: string;
  objectName: string;
  identificationCode: string;
  objectDescription: string;
  quantity: number;
  objectTypeCode: number;
  objectDetails: {
    maxOccupancy: number;
    maxAdultOccupancy: number;
    isSmokeAllowed: boolean;
    isPrivate: boolean;
    sleepArrangements: SleepArrangements[];
  };
  prices: Price[];
  amenities: Amenities[];
  images: Images[];
}

interface SleepArrangements {
  bedTypeCode: number;
  bedName: string;
  displayIcon: string;
  displayIconTypeCode: number;
  bedQuantity: number;
}

export interface Price {
  quoteId: string;
  name: string;
  priceDescription: string;
  regularTotalAmount: number;
  promotionTotalAmount: number;
  discountPercentage: number;
  totalTaxAmount: number;
  totalFeeAmount: number;
  nightQty: number;
  travelers: {
    Adults: number;
    Children: number;
    Babies: number;
    Ages: null;
  };
  taxes: null;
  fees: null;
  paymentMethods: null;
}

interface Amenities {
  amenityGroupTypeCode: number;
  sequenceOrder: number;
  Amenities: [
    {
      amenityTypeCode: number;
      displayIcon: string;
      displayIconTypeCode: number;
      active: boolean;
      customName: string;
    }
  ];
}

interface Images {
  imageId: number;
  imageUrl: string;
  subTitle: string;
  isMainImage: boolean;
  sequenceOrder: number;
}

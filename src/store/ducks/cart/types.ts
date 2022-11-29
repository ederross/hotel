export const Types = {
  ADD_CART_ROOM: '@cart/ADD_CART_ROOM',
  REMOVE_CART_ROOM: '@cart/REMOVE_CART_ROOM',
  ADD_CART_SERVICE: '@cart/ADD_CART_SERVICE',
  REMOVE_CART_SERVICE: '@cart/REMOVE_SERVICE_ROOM',
  SET_CART_INFOS: '@cart/SET_CART_INFOS',
  CLEAN_CART: '@cart/REMOVE_CART',
};

export interface TypesCart {
  startDate: string;
  endDate: string;
  services: CartService[];
  objects: CartRoom[];
  loading: boolean;
  error: boolean;
}

export interface CartRoom {
  objectId: string;
  identificationCode: string;
  prices: CartRoomPrice[];
  infos: {
    objectName: string;
    image: string;
    adults: number;
    children: number;
  };
}

interface CartRoomPrice {
  quoteId: string;
  regularTotalAmount: number;
  quantity: number;
  priceDescription: string;
  checkIn: string;
  checkOut: string;
  taxes: string[];
  fees: string[];
  travelers: {
    adults: number;
    childrens: number;
    ages: number[];
  };
}

export interface CartService {
  serviceId: number;
  serviceName: string;
  quantity: number;
  price: number;
}

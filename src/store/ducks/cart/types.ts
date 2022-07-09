export const Types = {
  ADD_CART_ROOM: '@cart/ADD_CART_ROOM',
  REMOVE_CART_ROOM: '@cart/REMOVE_CART_ROOM',
  ADD_CART_SERVICE: '@cart/ADD_CART_SERVICE',
  REMOVE_CART_SERVICE: '@cart/REMOVE_SERVICE_ROOM',
  CLEAN_CART: '@cart/REMOVE_CART',
};

export interface TypesCart {
  services: CartService[];
  rooms: CartRoom[];
  loading: boolean;
  error: boolean;
}

export interface CartRoom {
  objectId: string;
  objectName: string;
  quantity: number;
  price: number | null;
  image: string;
  adults: number;
  children: number;
}

export interface CartService {
  serviceId: number;
  serviceName: string;
  quantity: number;
  price: number;
}

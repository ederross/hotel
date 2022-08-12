import { TypesCart } from '../../store/ducks/cart/types';
import api, { officeId } from '../api';

interface IGetRoomSearch {
  startDate: string;
  endDate: string;
  adults: string;
  children: string;
}

export const GetRoomSearch = async ({
  adults,
  children,
  endDate,
  startDate,
}: IGetRoomSearch) => {
  return await api
    .get('/booking/room-search', {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        officeId,
        startDate,
        endDate,
        adults,
        children,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log('ROOM SEARCH ERROR!', err);
      return [];
    });
};

export const GetServiceSearch = async () => {
  const res = await api
    .get('/booking/services', {
      params: {
        officeId,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log('SERVICE SEARCH ERROR!', err);
      return [];
    });

  return res;
};

export const GetCalendarSearch = async (startDate: string, endDate: string) => {
  const res = await api
    .get('/booking/calendar-search', {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        officeId,
        startDate,
        endDate,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log('CALENDAR SEARCH ERROR!', err);
      return [];
    });

  return res;
};

export const PostPaymentMethods = async (cart: TypesCart) => {
  return await api.post(
    '/booking/payment-methods',
    {
      officeId: cart?.officeId,
      objects: cart?.objects?.map((o) => {
        return {
          objectId: parseInt(o?.objectId),
          identificationCode: '',
          quantity: o?.prices
            ?.map((p) => p?.quantity)
            ?.reduce((a, b) => a + b, 0),
          prices: o?.prices?.map((p) => {
            return {
              quoteId: p?.quoteId,
            };
          }),
        };
      }),
      services: cart?.services?.map((s) => {
        return { serviceId: s.serviceId, quantity: s.quantity };
      }),
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};

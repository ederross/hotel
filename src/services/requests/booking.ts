import { logger } from '../../components/Logger';
import { TypesCart } from '../../store/ducks/cart/types';
import api, { apiToken, credentials } from '../api';

interface IGetRoomSearch {
  officeId: string;
  startDate: string;
  endDate: string;
  adults: string;
  children: string;
  age: number[];
}

export interface IPaymentBooking {
  totalAmont: number;
  installmentCount: number;
  paymentMethod: {
    paymentMethodTypeCode: number;
    paymentDetails: [
      {
        paymentInstallmentCount: number;
        paymentTotalAmount: number;
      }
    ];
    methodDetails: [
      {
        cardSchemeTypeCode: number | null;
        cardHolder: string | null;
        encryptedCardNumber: string | null;
        encryptedExpiryYear: string | null;
        encryptedSecurityCode: string | null;
      }
    ];
  };
}

export interface IClientBooking {
  clientName: string;
  documentNumber: string;
  contacts: [
    {
      contactTypeCode: number;
      contactText: string;
    },
    {
      contactTypeCode: number;
      CountryPhoneCode: string;
      StatePhoneCode: string;
      PhoneNumber: string;
    }
  ];
}

export const GetRoomSearch = async ({
  adults,
  children,
  endDate,
  startDate,
  age = [],
  officeId,
}: IGetRoomSearch) => {
  return await api
    .get(`/booking/room-search/`, {
      headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Headers': '*',
        Authorization: `Basic ${credentials}`,
      },
      params: {
        officeId,
        startDate,
        endDate,
        adults,
        children,
        age: age,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      logger.error(`ROOM SEARCH ERROR!`, {
        errorDescription: err,
      });
      return [];
    });
};

export const GetServiceSearch = async (id: string) => {
  const res = await api
    .get('/booking/services', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials}`,
      },
      params: {
        officeId: id,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      logger.error(`SERVICE SEARCH ERROR!`, {
        errorDescription: err,
      });
      return [];
    });

  return res;
};

export const GetCalendarSearch = async (
  startDate: string,
  endDate: string,
  id: string
) => {
  const res = await api
    .get('/booking/calendar-search', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials}`,
        // 'Access-Control-Allow-Headers': '*',
      },
      params: {
        officeId: id,
        startDate,
        endDate,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      logger.error(`CALENDAR SEARCH ERROR!`, {
        errorDescription: err,
      });
      return [];
    });

  return res;
};

export const PostPaymentMethods = async (cart: TypesCart) => {
  return await api
    .post('/booking/payment-methods', cart, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      logger.error(`PAYMENT METHODS ERROR!`, {
        errorDescription: err,
      });
      return [];
    });
};

export const PostBooking = async (data: any) => {
  return await api.post('/booking', data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${credentials}`,
    },
  });
};

import { TypesCart } from '../../store/ducks/cart/types';
import api, { officeId } from '../api';

interface IGetRoomSearch {
  startDate: string;
  endDate: string;
  adults: string;
  children: string;
}

interface IPaymentBooking {
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
        encryptedCardNumber: string | null;
        encryptedExpiryYear: string | null;
        encryptedSecurityCode: string | null;
      }
    ];
  };
}

interface IClientBooking {
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

export const PostBooking = async (
  cart: TypesCart,
  client: IClientBooking,
  payment: IPaymentBooking
) => {
  return await api.post(
    '/booking',
    {
      officeId: cart?.officeId,
      client: {
        personTypeCode: 'F',
        documentTypeCode: 1,
        ...client,
      },
      objects: cart?.objects?.map((o) => {
        return {
          objectId: o?.objectId,
          identificationCode: '',
          quantity: o?.prices
            ?.map((p) => p?.quantity)
            ?.reduce((a, b) => a + b, 0),
          prices: o?.prices?.map((p) => {
            return {
              quoteId: p?.quoteId,
              priceDescription: p.priceDescription,
              checkIn: p?.checkIn,
              checkOut: p?.checkOut,
              rates: p?.taxes || [],
              travelers: {
                ...p?.travelers,
                adults: parseInt(p?.travelers?.adults as any),
                childrens: parseInt(p?.travelers?.childrens as any),
              },
            };
          }),
        };
      }),
      services: cart?.services?.map((s) => {
        return { serviceId: s.serviceId, quantity: s.quantity };
      }),
      charge: {
        totalAmont: payment?.totalAmont,
        installmentCount: payment?.totalAmont,
        payers: [
          {
            personTypeCode: 'F',
            documentTypeCode: 1,
            personName: client?.clientName,
            documentNumber: client?.documentNumber,
            payerEmail: client?.contacts[0]?.contactText,
            paymentMethod: payment?.paymentMethod,
          },
        ],
      },
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};

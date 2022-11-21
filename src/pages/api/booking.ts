// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { logger } from '../../components/Logger';
import { dynamicOffice, officeId } from '../../services/api';
import { PostBooking } from '../../services/requests/booking';

export default function handler(req, res) {
  try {
    //officeID
    const xfowardedHost = req.headers['x-forwarded-host'];
    console.log(`X-fowardedHost: ${xfowardedHost}`);
    logger.info(`X-fowardedHost: ${xfowardedHost}`);

    const id =
      dynamicOffice && !!xfowardedHost
        ? xfowardedHost?.toString()?.split('.')[0]
        : officeId;

    const cart = req?.body?.cart;
    const client = req?.body?.client;
    const payment = req?.body?.payment;

    const formattedDate = {
      officeId: id,
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
    };

    PostBooking(formattedDate)
      .then((data: any) => {
        res.status(200).json(data?.data);
      })
      .catch((err) => {
        logger.error(`FALHA AO RESERVAR QUARTO!`, { errorDescription: err });
        res.status(err?.status || 500).json(err);
      });
  } catch (error) {
    res.status(500).json('Post Booking Error');
  }
}

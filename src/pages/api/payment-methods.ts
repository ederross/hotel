// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { logger } from '../../components/Logger';
import { dynamicOffice, officeId } from '../../services/api';
import { PostPaymentMethods } from '../../services/requests/booking';
export default function handler(req, res) {
  if (req.method === 'POST') {
    try {
      //officeID
      const xfowardedHost = req.headers['x-forwarded-host'];
      console.log(`X-fowardedHost: ${xfowardedHost}`);
      logger.info(`X-fowardedHost: ${xfowardedHost}`);

      const fwHost = !!xfowardedHost && xfowardedHost?.toString()?.split('.')[0] !== "www"
        ? xfowardedHost?.toString()?.split('.')[0]
        : xfowardedHost?.toString()?.split('.')[1];

      console.log(fwHost);

      const id =
        dynamicOffice && !!xfowardedHost
          ? xfowardedHost?.toString()?.split('.')[0]
          : officeId;

      const body = req?.body;

      const cart = {
        officeId: id,
        objects: body?.objects?.map((o) => {
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
        services: body?.services?.map((s) => {
          return { serviceId: s.serviceId, quantity: s.quantity };
        }),
      };
      PostPaymentMethods(cart as any)
        .then((data: any) => {
          res.status(200).json(data);
        })
        .catch((err) => {
          logger.error(`FALHA AO PEGAR MÉTODOS DE PAGAMENTO!`, {
            errorDescription: err,
          });
          res.status(400).json([]);
        });
    } catch (error) {
      res.status(500).json('Post PaymentMethods Error');
    }
  } else {
    res.status(404).json('API NOT FOUND');
  }
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { dynamicOffice, officeId } from '../../services/api';
import { PostPaymentMethods } from '../../services/requests/booking';
import { getCircularReplacer } from '../../utils/currency';

export default function handler(req, res) {
  if (req.method === 'POST') {
    try {
      //officeID
      const id = dynamicOffice
        ? window?.location?.hostname.split('.')[0]
        : officeId;

      const cart = req?.body;
      PostPaymentMethods(cart)
        .then((data: any) => {
          res.status(200).json(data);
        })
        .catch((err) => {
          console.log('>>> FALHA AO PEGAR MÉTODOS DE PAGAMENTO! <<<\n', err);
          res.status(200).json([]);
        });
    } catch (error) {
      res.status(500).json('Post PaymentMethods Error');
    }
  } else {
    res.status(404).json('API NOT FOUND');
  }
}

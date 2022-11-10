// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { dynamicOffice, officeId } from '../../services/api';
import { PostBooking } from '../../services/requests/booking';

export default function handler(req, res) {
  try {
    //officeID
    const id = dynamicOffice
      ? window?.location?.hostname.split('.')[0]
      : officeId;

    PostBooking(req?.body?.cart, req?.body?.client, req?.body?.payment)
      .then((data: any) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log('>>> FALHA AO RESERVAR QUARTO! <<<\n', err);
        res.status(200).json({});
      });
  } catch (error) {
    res.status(500).json('Post Booking Error');
  }
}

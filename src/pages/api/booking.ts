// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { dynamicOffice, officeId } from '../../services/api';
import { PostBooking } from '../../services/requests/booking';

export default function handler(req, res) {
  try {
    //officeID
    const xfowardedHost = req.headers['x-forwarded-host'];
    console.log('X-fowardedHost: ' + xfowardedHost);

    const id =
      dynamicOffice && !!xfowardedHost
        ? xfowardedHost?.toString()?.split('.')[0]
        : officeId;
    PostBooking(
      { ...req?.body?.cart, officeId: id },
      req?.body?.client,
      req?.body?.payment
    )
      .then((data: any) => {
        res.status(200).json(data?.data);
      })
      .catch((err) => {
        console.log('>>> FALHA AO RESERVAR QUARTO! <<<\n', err);
        res.status(err?.status || 500).json(err);
      });
  } catch (error) {
    res.status(500).json('Post Booking Error');
  }
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { dynamicOffice, officeId } from '../../services/api';
import { GetRoomSearch } from '../../services/requests/booking';

export default function handler(req, res) {
  try {
    //officeID
    const xfowardedHost = req.headers['x-forwarded-host'];
    console.log('X-fowardedHost: ' + xfowardedHost);
  
    const id =
      dynamicOffice && !!xfowardedHost
        ? xfowardedHost?.toString()?.split('.')[0]
        : officeId;
   
    GetRoomSearch({
      startDate: req?.query?.startDate,
      endDate: req?.query?.endDate,
      adults: req?.query?.adults,
      children: req?.query?.children,
      age: req?.query?.age || [],
      officeId: id,
    })
      .then((data: any) => {
        res.status(200).json(data?.data);
      })
      .catch((err) => {
        console.log('>>> FALHA AO PEGAR A PESQUISA DE QUARTOS! <<<\n', err);
        res.status(200).json([]);
      });
  } catch (error) {
    res.status(500).json('Get Room Error');
  }
}

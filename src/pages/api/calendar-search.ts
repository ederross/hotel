// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { dynamicOffice, officeId } from '../../services/api';
import { GetCalendarSearch } from '../../services/requests/booking';

export default function handler(req, res) {
  try {
    //officeID
    const id = dynamicOffice
      ? window?.location?.hostname.split('.')[0]
      : officeId;

    GetCalendarSearch(req?.query?.startDate, req?.query?.endDate, id)
      .then((data: any) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log('>>> FALHA AO PEGAR A PESQUISA DE CALENDÁRIO! <<<\n', err);
        res.status(200).json([]);
      });
  } catch (error) {
    res.status(500).json('Get Calendar Error');
  }
}

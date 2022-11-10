// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { dynamicOffice, officeId } from '../../services/api';
import { GetServiceSearch } from '../../services/requests/booking';

export default function handler(req, res) {
  try {
    //officeID
    const id = dynamicOffice
      ? window?.location?.hostname.split('.')[0]
      : officeId;

    GetServiceSearch(id)
      .then((data: any) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log('>>> FALHA AO PEGAR A PESQUISA DE SERVIÇOS! <<<\n', err);
        res.status(200).json([]);
      });
  } catch (error) {
    res.status(500).json('Get Services Error');
  }
}

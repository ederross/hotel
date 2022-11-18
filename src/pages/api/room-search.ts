// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { logger } from '../../components/Logger';
import { dynamicOffice, officeId } from '../../services/api';
import { GetRoomSearch } from '../../services/requests/booking';

export default function handler(req, res) {
  try {
    //officeID
    const xfowardedHost = req.headers['x-forwarded-host'];
    logger.info(`X-fowardedHost: ${xfowardedHost}`);

    const id =
      dynamicOffice && !!xfowardedHost
        ? xfowardedHost?.toString()?.split('.')[0]
        : officeId;

    const formattedAges = req?.query?.age
      ?.split(',')
      .map((c) => parseInt(c))
      .filter(Boolean);
    GetRoomSearch({
      startDate: req?.query?.startDate,
      endDate: req?.query?.endDate,
      adults: req?.query?.adults,
      children: req?.query?.children,
      age: formattedAges,
      officeId: id,
    })
      .then((data: any) => {
        res.status(200).json(data?.data);
      })
      .catch((err) => {
        logger.error(`FALHA AO PEGAR A PESQUISA DE QUARTOS!`, {
          errorDescription: err,
        });
        res.status(200).json([]);
      });
  } catch (error) {
    res.status(500).json('Get Room Error');
  }
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { logger } from '../../components/Logger';
import { dynamicOffice, officeId } from '../../services/api';
import { GetCalendarSearch } from '../../services/requests/booking';

export default function handler(req, res) {
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

    GetCalendarSearch(req?.query?.startDate, req?.query?.endDate, id)
      .then((data: any) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        logger.error(`FALHA AO PEGAR A PESQUISA DE CALENDÁRIO!`, {
          errorDescription: err,
        });
        res.status(200).json([]);
      });
  } catch (error) {
    res.status(500).json('Get Calendar Error');
  }
}

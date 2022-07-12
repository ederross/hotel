import api, { officeId } from '../api';

interface IGetRoomSearch {
  startDate: string;
  endDate: string;
  adults: string;
  children: string;
}

export const GetRoomSearch = async ({
  adults,
  children,
  endDate,
  startDate,
}: IGetRoomSearch) => {
  const res = await api
    .get('/booking/room-search', {
      params: {
        officeId,
        startDate,
        endDate,
        adults,
        children,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log('ROOM SEARCH ERROR!', err);
      return [];
    });

  return res;
};

export const GetServiceSearch = async () => {
  const res = await api
    .get('/booking/services', {
      params: {
        officeId,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log('SERVICE SEARCH ERROR!', err);
      return [];
    });

  return res;
};

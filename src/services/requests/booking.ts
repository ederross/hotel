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
  return await api.get('/booking/room-search', {
    params: {
      officeId,
      startDate,
      endDate,
      adults,
      children,
    },
  });
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

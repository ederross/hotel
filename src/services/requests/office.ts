import moment from 'moment';
import api, { officeId } from '../api';

export const GetOfficeDetails = async () => {
  const res = await api
    .get(`/offices/${officeId}`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      console.log('OFFICE DETAILS ERROR!');
      return {};
    });

  return res;
};

export const GetOfficeDesign = async () => {
  const res = await api
    .get(`/offices/${officeId}/design`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      console.log('OFFICE DESIGN ERROR!');
      return {};
    });

  return res;
};

export const GetOfficeReviews = async () => {
  const res = await api
    .get(`/offices/${officeId}/reviews`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      console.log('OFFICE REVIEWS ERROR!');
      return [];
    });

  return res;
};

export const GetOfficeImages = async () => {
  const res = await api
    .get(`/offices/${officeId}/images`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      console.log('OFFICE IMAGES ERROR!');
      return [];
    });

  return res;
};

export const GetOfficeEvents = async () => {
  const res = await api
    .get(`/offices/${officeId}/events`, {
      params: {
        startDate: moment().format('YYYY-MM-DD'),
        endDate: moment().add(2, 'M').format('YYYY-MM-DD'),
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      console.log('OFFICE EVENTS ERROR!');
      return [];
    });

  return res;
};

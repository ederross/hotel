import moment from 'moment';
import api from '../api';

export const GetOfficeDetails = async (id: string) => {
  const res = await api
    .get(`/offices/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      console.log('OFFICE DETAILS ERROR!');
      return {};
    });

  return res;
};

export const GetOfficeDesign = async (id: string) => {
  const res = await api
    .get(`/offices/${id}/design`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      console.log('OFFICE DESIGN ERROR!');
      return {};
    });

  return res;
};

export const GetOfficeReviews = async (id: string) => {
  const res = await api
    .get(`/offices/${id}/reviews`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      console.log('OFFICE REVIEWS ERROR!');
      return [];
    });

  return res;
};

export const GetOfficeImages = async (id: string) => {
  const res = await api
    .get(`/offices/${id}/images`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      console.log('OFFICE IMAGES ERROR!');
      return [];
    });

  return res;
};

export const GetOfficeEvents = async (id: string) => {
  const res = await api
    .get(`/offices/${id}/events`, {
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

export const GetOfficeFacilities = async (id: string) => {
  const res = await api
    .get(`/offices/${id}/facilities`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      console.log('OFFICE FACILITIES ERROR!');
      return [];
    });

  return res;
};

export const GetOfficePolicies = async (id: string) => {
  const res = await api
    .get(`/offices/${id}/policies`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      console.log('OFFICE POLICIES ERROR!');
      return {};
    });

  return res;
};

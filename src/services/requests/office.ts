import moment from 'moment';
import { logger } from '../../components/Logger';
import api, { apiToken, credentials } from '../api';

export const GetOfficeDetails = async (id: string) => {
  const res = await api
    .get(`/offices/${id}`, {
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      logger.error(`OFFICE DETAILS ERROR!`, {
        errorDescription: error,
      });
      return {};
    });

  return res;
};

export const GetOfficeDesign = async (id: string) => {
  const res = await api
    .get(`/offices/${id}/design`, {
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      logger.error(`OFFICE DESIGN ERROR!`, {
        errorDescription: error,
      });
      return {};
    });

  return res;
};

export const GetOfficeReviews = async (id: string) => {
  const res = await api
    .get(`/offices/${id}/reviews`, {
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      logger.error(`OFFICE REVIEWS ERROR!`, {
        errorDescription: error,
      });
      return [];
    });

  return res;
};

export const GetOfficeImages = async (id: string) => {
  const res = await api
    .get(`/offices/${id}/images`, {
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      logger.error(`OFFICE IMAGES ERROR!`, {
        errorDescription: error,
      });
      return [];
    });

  return res;
};

export const GetOfficeEvents = async (id: string) => {
  const res = await api
    .get(`/offices/${id}/events`, {
      headers: {
        Authorization: `Basic ${credentials}`,
      },
      params: {
        startDate: moment().format('YYYY-MM-DD'),
        endDate: moment().add(2, 'M').format('YYYY-MM-DD'),
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      logger.error(`OFFICE EVENTS ERROR!`, {
        errorDescription: error,
      });
      return [];
    });

  return res;
};

export const GetOfficeFacilities = async (id: string) => {
  const res = await api
    .get(`/offices/${id}/facilities`, {
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      logger.error(`OFFICE FACILITIES ERROR!`, {
        errorDescription: error,
      });
      return [];
    });

  return res;
};

export const GetOfficePolicies = async (id: string) => {
  const res = await api
    .get(`/offices/${id}/policies`, {
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      logger.error(`OFFICE POLICIES ERROR!`, {
        errorDescription: error,
      });
      return {};
    });

  return res;
};

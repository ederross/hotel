import { logger } from '../../components/Logger';
import api, { credentials } from '../api';

const emptyDomain = {
  data: [],
  links: {
    self: '',
    first: '',
    prev: '',
    next: '',
    last: '',
  },
  meta: {
    totalRecords: 0,
    totalPages: 0,
    requestDateTime: '0001-01-01T00:00:00Z',
  },
};

export const GetIconsDomain = async (AcceptLanguage: string) =>
  await (
    await api
      .get('/domain/iconTypeCode', {
        headers: {
          'Accept-Language': AcceptLanguage,
          Authorization: `Basic ${credentials}`,
        },
      })
      .catch((error) => {
        logger.error(`GET iconTypeCode ERROR`, {
          errorDescription: error,
        });
        return emptyDomain;
      })
  ).data;
export const GetContactDomain = async (AcceptLanguage: string) =>
  await (
    await api
      .get('/domain/contactTypeCode', {
        headers: {
          'Accept-Language': AcceptLanguage,
          Authorization: `Basic ${credentials}`,
        },
      })
      .catch((error) => {
        logger.error(`GET contactTypeCode ERROR`, {
          errorDescription: error,
        });
        return emptyDomain;
      })
  ).data;
export const GetFacilitiesDomain = async (AcceptLanguage: string) =>
  await (
    await api
      .get('/domain/facilityCategoryTypeCode', {
        headers: {
          'Accept-Language': AcceptLanguage,
          Authorization: `Basic ${credentials}`,
        },
      })
      .catch((error) => {
        logger.error(`GET facilityCategoryTypeCode ERROR`, {
          errorDescription: error,
        });
        return emptyDomain;
      })
  ).data;
export const GetFacilitiesItemDomain = async (AcceptLanguage: string) =>
  await (
    await api
      .get('/domain/facilityTypeCode', {
        headers: {
          'Accept-Language': AcceptLanguage,
          Authorization: `Basic ${credentials}`,
        },
      })
      .catch((error) => {
        logger.error(`GET facilityTypeCode ERROR`, {
          errorDescription: error,
        });
        return emptyDomain;
      })
  ).data;
export const GetAmenitiesDomain = async (AcceptLanguage: string) =>
  await (
    await api
      .get('/domain/amenityTypeCode', {
        headers: {
          'Accept-Language': AcceptLanguage,
          Authorization: `Basic ${credentials}`,
        },
      })
      .catch((error) => {
        logger.error(`GET amenityTypeCode ERROR`, {
          errorDescription: error,
        });
        return emptyDomain;
      })
  ).data;
export const GetServicesDomain = async (AcceptLanguage: string) =>
  await (
    await api
      .get('/domain/serviceTypeCode', {
        headers: {
          'Accept-Language': AcceptLanguage,
          Authorization: `Basic ${credentials}`,
        },
      })
      .catch((error) => {
        logger.error(`GET serviceTypeCode ERROR`, {
          errorDescription: error,
        });
        return emptyDomain;
      })
  ).data;
export const GetServicePricesDomain = async (AcceptLanguage: string) =>
  await (
    await api
      .get('/domain/servicePriceTypeCode', {
        headers: {
          'Accept-Language': AcceptLanguage,
          Authorization: `Basic ${credentials}`,
        },
      })
      .catch((error) => {
        logger.error(`GET servicePriceTypeCode ERROR`, {
          errorDescription: error,
        });
        return emptyDomain;
      })
  ).data;
export const GetPaymethodDomain = async (AcceptLanguage: string) =>
  await (
    await api
      .get('/domain/paymentMethodTypeCode', {
        headers: {
          'Accept-Language': AcceptLanguage,
          Authorization: `Basic ${credentials}`,
        },
      })
      .catch((error) => {
        logger.error(`GET paymentMethodTypeCode ERROR`, {
          errorDescription: error,
        });
        return emptyDomain;
      })
  ).data;

export const GetPolicyDomain = async (AcceptLanguage: string) =>
  await (
    await api
      .get('/domain/policyGroupTypeCode', {
        headers: {
          'Accept-Language': AcceptLanguage,
          Authorization: `Basic ${credentials}`,
        },
      })
      .catch((error) => {
        logger.error(`GET policyGroupTypeCode ERROR`, {
          errorDescription: error,
        });
        return emptyDomain;
      })
  ).data;

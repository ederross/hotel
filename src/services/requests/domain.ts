import api from '../api';

export const GetIconsDomain = async (AcceptLanguage: string) =>
  await (
    await api.get('/domain/iconTypeCode', {
      headers: {
        'Accept-Language': AcceptLanguage,
      },
    })
  ).data;
export const GetContactDomain = async (AcceptLanguage: string) =>
  await (
    await api.get('/domain/contactTypeCode', {
      headers: {
        'Accept-Language': AcceptLanguage,
      },
    })
  ).data;
export const GetFacilitiesDomain = async (AcceptLanguage: string) =>
  await (
    await api.get('/domain/facilityCategoryTypeCode', {
      headers: {
        'Accept-Language': AcceptLanguage,
      },
    })
  ).data;
export const GetAmenitiesDomain = async (AcceptLanguage: string) =>
  await (
    await api.get('/domain/amenityTypeCode', {
      headers: {
        'Accept-Language': AcceptLanguage,
      },
    })
  ).data;
export const GetServicesDomain = async (AcceptLanguage: string) =>
  await (
    await api.get('/domain/serviceTypeCode', {
      headers: {
        'Accept-Language': AcceptLanguage,
      },
    })
  ).data;
export const GetServicePricesDomain = async (AcceptLanguage: string) =>
  await (
    await api.get('/domain/servicePriceTypeCode', {
      headers: {
        'Accept-Language': AcceptLanguage,
      },
    })
  ).data;
export const GetPaymethodDomain = async (AcceptLanguage: string) =>
  await (
    await api.get('/domain/paymentMethodTypeCode', {
      headers: {
        'Accept-Language': AcceptLanguage,
      },
    })
  ).data;

export const GetPolicyDomain = async (AcceptLanguage: string) =>
  await (
    await api.get('/domain/policyGroupTypeCode', {
      headers: {
        'Accept-Language': AcceptLanguage,
      },
    })
  ).data;

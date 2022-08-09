import api from '../api';

export const GetIconsDomain = async () =>
  await (
    await api.get('/domain/iconTypeCode', {
      headers: {
        'Accept-Language': 'pt-BR',
      },
    })
  ).data;
export const GetContactDomain = async () =>
  await (
    await api.get('/domain/contactTypeCode', {
      headers: {
        'Accept-Language': 'pt-BR',
      },
    })
  ).data;
export const GetFacilitiesDomain = async () =>
  await (
    await api.get('/domain/facilityCategoryTypeCode', {
      headers: {
        'Accept-Language': 'pt-BR',
      },
    })
  ).data;
export const GetAmenitiesDomain = async () =>
  await (
    await api.get('/domain/amenityTypeCode', {
      headers: {
        'Accept-Language': 'pt-BR',
      },
    })
  ).data;
export const GetServicesDomain = async () =>
  await (
    await api.get('/domain/serviceTypeCode', {
      headers: {
        'Accept-Language': 'pt-BR',
      },
    })
  ).data;
export const GetServicePricesDomain = async () =>
  await (
    await api.get('/domain/servicePriceTypeCode', {
      headers: {
        'Accept-Language': 'pt-BR',
      },
    })
  ).data;

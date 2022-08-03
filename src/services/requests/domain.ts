import api from '../api';

export const GetIconsDomain = async () =>
  await (
    await api.get('/domain/iconTypeCode')
  ).data;
export const GetContactDomain = async () =>
  await (
    await api.get('/domain/contactTypeCode')
  ).data;
export const GetFacilitiesDomain = async () =>
  await (
    await api.get('/domain/facilityCategoryTypeCode')
  ).data;
export const GetAmenitiesDomain = async () =>
  await (
    await api.get('/domain/amenityTypeCode')
  ).data;
export const GetServicesDomain = async () =>
  await (
    await api.get('/domain/serviceTypeCode')
  ).data;
export const GetServicePricesDomain = async () =>
  await (
    await api.get('/domain/servicePriceTypeCode')
  ).data;

import React, { useState } from 'react';
import {
  EmailRounded,
  PhoneAndroidRounded,
  PinDropRounded,
} from '@mui/icons-material';
import {
  ContactContainer,
  ContainerHolder,
  CopyrightContainer,
  FooterContainer,
  InformationContainer,
  SocialContainer,
} from './styles';
import { OfficeDetails } from '../../../../data/officeDetails';
import { useTranslation } from 'next-i18next';
import { Globe, Instagram, Twitter } from 'react-feather';
import { Design } from '../../../../data/design';
import { GlobeContainer } from '../FooterCheckout/styles';
import { useRouter } from 'next/router';
import LanguageSwitcher from '../../LanguageSwitcher';
interface IFooterProps {
  officeDetails: OfficeDetails;
  design: Design;
  marginTop?: number | string;
}

const Footer = ({ design, officeDetails, marginTop }: IFooterProps) => {
  const { t } = useTranslation('common');
  const address = officeDetails?.address;
  const { locale } = useRouter();
  const [logoError, setLogoError] = useState(false);

  let languageLabels = [
    {
      label: 'English',
      language: 'en-US',
    },
    {
      label: 'Português',
      language: 'pt-BR',
    },
  ];
  const [openLanguageSwitcher, setOpenLanguageSwitcher] = useState(false);

  const handleLanguageSwitcher = () => {
    document.body.style.overflow = openLanguageSwitcher ? 'initial' : 'hidden';
    setOpenLanguageSwitcher(!openLanguageSwitcher);
  };

  return (
    <>
      <FooterContainer style={{ marginTop: marginTop }}>
        <ContainerHolder>
          <div className="topContainer">
            <SocialContainer>
              <div className={'logo'}>
                {!logoError ? (
                  <img
                    src={design?.logoUrl}
                    alt={design?.browserTitle}
                    title={design?.browserTitle}
                    onError={() => setLogoError(true)}
                    draggable={false}
                  />
                ) : (
                  <span>{design?.browserTitle}</span>
                )}
              </div>
              <h3>{officeDetails?.officeName}</h3>
              <p>
                {officeDetails?.officeDescription?.length > 320
                  ? officeDetails?.officeDescription.slice(0, 320) + '...'
                  : officeDetails?.officeDescription}
              </p>
            </SocialContainer>

            <ContactContainer>
              <div>
                <h3>{t('contact')}</h3>

                {officeDetails?.contacts
                  ?.filter((o) => o.contactTypeCode === 1)
                  ?.map((item, index) => (
                    <div key={index} className="row">
                      <PhoneAndroidRounded style={{ color: '#fff' }} />
                      <p>
                        +{item.countryPhoneCode} {item.phoneNumber}
                      </p>
                    </div>
                  ))}
                {officeDetails?.contacts
                  ?.filter((o) => o.contactTypeCode === 2)
                  ?.map((item, index) => (
                    <a
                      key={index}
                      href="mailto:contac@finehost.com"
                      title="contac@finehost.com"
                      className="row"
                    >
                      <EmailRounded style={{ color: '#fff' }} />
                      <p>{item?.contactText}</p>
                    </a>
                  ))}
                {address && (
                  <a
                    className="row"
                    href={`https://www.google.com/maps/?q=${address.latLong.latitude},${address.latLong.longitude}`}
                    title={'Ver mapa'}
                    target={'_blank'}
                    rel="noreferrer"
                  >
                    <PinDropRounded style={{ color: '#fff' }} />
                    <p>
                      {address?.streetName}, {address?.streetNumber}
                      {' - '}
                      {address?.neighborhoodName} | {address?.CityName}
                      {' - '}
                      {address?.StateName}
                    </p>
                  </a>
                )}

                <div style={{ display: 'flex' }}>
                  {officeDetails?.contacts
                    ?.filter((o) => o.contactTypeCode === 3)
                    ?.map((item, index) => (
                      <a
                        href={`https://www.instagram.com/${item?.contactText}`}
                        className="socialCircle"
                        key={index}
                        title={item.name}
                        target={'_blank'}
                        rel="noreferrer"
                      >
                        <Instagram className="icon" />
                      </a>
                    ))}
                  {officeDetails?.contacts
                    ?.filter((o) => o.contactTypeCode === 4)
                    ?.map((item, index) => (
                      <a
                        href={`https://twitter.com/${item?.contactText}`}
                        className="socialCircle"
                        key={index}
                        title={item.name}
                        target={'_blank'}
                        rel="noreferrer"
                      >
                        <Twitter className="icon" />
                      </a>
                    ))}
                </div>
              </div>
            </ContactContainer>

            <InformationContainer>
              <div>
                <h3>{t('information_other')}</h3>
                <a href="/terms-and-conditions" title={t('termsAndConditions')}>
                  <p className="link">{t('termsAndConditions')}</p>
                </a>
                <br />
                <a href="/privacy-police" title={t('privacyPolicies')}>
                  <p className="link">{t('privacyPolicies')}</p>
                </a>
              </div>
            </InformationContainer>
          </div>
          <hr style={{ marginTop: 32, border: 'none', borderTop: '1px solid #cacaca', marginBottom: 32 }} />
          <GlobeContainer
            style={{
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              marginTop: 16,
            }}
          >
            <Globe style={{ color: 'white', marginRight: 8 }} />
            <h4
              onClick={handleLanguageSwitcher}
              style={{ color: 'white' }}
              className={'textWithHover'}
            >
              {languageLabels
                .map((value, index) => {
                  return value.language === locale
                    ? value.label + ' ' + `(${value.language})`
                    : 'Not found';
                })
                .filter((value, index) => value !== 'Not found')}
            </h4>
          </GlobeContainer>
          <CopyrightContainer>
            <h4>
              © {new Date().getFullYear()} FINEHOST. {t('allRightsReserved')}
            </h4>
          </CopyrightContainer>
        </ContainerHolder>
      </FooterContainer>
      {openLanguageSwitcher && (
        <LanguageSwitcher
          openLanguageSwitcher={openLanguageSwitcher}
          handleCloseLanguageSwitcher={handleLanguageSwitcher}
        />
      )}
    </>
  );
};

export default Footer;

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
import { Instagram, Twitter } from 'react-feather';
import { Design } from '../../../../data/design';
interface IFooterProps {
  officeDetails: OfficeDetails;
  design: Design;
}

const Footer = ({ design, officeDetails }: IFooterProps) => {
  const { t } = useTranslation('common');
  const address = officeDetails?.address;
  const [logoError, setLogoError] = useState(false);

  return (
    <FooterContainer>
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
              <a
                href="mailto:contac@finehost.com"
                title="contac@finehost.com"
                className="row"
              >
                <EmailRounded style={{ color: '#fff' }} />
                <p>contac@finehost.com</p>
              </a>
              {officeDetails?.contacts?.map((item, index) => (
                <div key={index} className="row">
                  <PhoneAndroidRounded style={{ color: '#fff' }} />
                  <p>
                    +{item.countryPhoneCode} {item.phoneNumber}
                  </p>
                </div>
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
                    {address?.streetName}, {address?.streetNumber},{' '}
                    {address?.additionalInfo} - {address?.stateCode} |{' '}
                    {address?.postalCode}
                  </p>
                </a>
              )}

              <div style={{ display: 'flex' }}>
                {socialData?.map((item, index) => (
                  <a
                    href={item.link}
                    className="socialCircle"
                    key={index}
                    title={item.name}
                    target={'_blank'}
                    rel="noreferrer"
                  >
                    {item.icon === 'Twitter' ? (
                      <Twitter className="icon" />
                    ) : (
                      <Instagram className="icon" />
                    )}
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
        <CopyrightContainer>
          <h4>
            © {new Date().getFullYear()} FINEHOST. {t('allRightsReserved')}
          </h4>
        </CopyrightContainer>
      </ContainerHolder>
    </FooterContainer>
  );
};

export default Footer;

const socialData = [
  {
    name: 'Instagram',
    url: '',
    icon: 'Instagram',
    link: 'https://www.instagram.com',
  },
  { name: 'Twitter', url: '', icon: 'Twitter', link: 'https://twitter.com' },
];

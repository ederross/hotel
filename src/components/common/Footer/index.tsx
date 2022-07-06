import React from 'react';
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
interface IFooterProps {
  officeDetails: OfficeDetails;
}

const Footer = (props: IFooterProps) => {
  const { t } = useTranslation('common');
  const address = props?.officeDetails?.address;

  return (
    <FooterContainer>
      <ContainerHolder>
        <div className="topContainer">
          <SocialContainer>
            <h3>{props?.officeDetails?.officeName}</h3>
            <p>{props?.officeDetails?.officeDescription}</p>
            <div className="row">
              {socialData?.map((item, index) => (
                <div className="socialCircle" key={index} title={item.name}>
                  {item.icon === 'Twitter' ? (
                    <Twitter className="icon" />
                  ) : (
                    <Instagram className="icon" />
                  )}
                </div>
              ))}
            </div>
          </SocialContainer>

          <ContactContainer>
            <h3>{t('contact')}</h3>
            <div className="row">
              <EmailRounded style={{ color: '#fff' }} />
              <p>contac@finehost.com</p>
            </div>
            {props?.officeDetails?.contacts?.map((item, index) => (
              <div key={index} className="row">
                <PhoneAndroidRounded style={{ color: '#fff' }} />
                <p>
                  +{item.countryPhoneCode} {item.phoneNumber}
                </p>
              </div>
            ))}
            {address && (
              <div className="row">
                <PinDropRounded style={{ color: '#fff' }} />
                <p>
                  {address?.streetName}, {address?.streetNumber},{' '}
                  {address?.additionalInfo} - {address?.stateCode} |{' '}
                  {address?.postalCode}
                </p>
              </div>
            )}
            <CopyrightContainer>
              <h4>
                © {new Date().getFullYear()} FINEHOST. {t('allRightsReserved')}
              </h4>
              {/* <p>Lorem ipsum dolor sit amet. Sectus actus dolor.</p> */}
            </CopyrightContainer>
          </ContactContainer>

          <InformationContainer>
            <h3>{t('information_other')}</h3>
            <a href="/terms-and-conditions" title={t('termsAndConditions')}>
              <p className="link">{t('termsAndConditions')}</p>
            </a>
            <br />
            <a href="/privacy-police" title={t('privacyPolicies')}>
              <p className="link">{t('privacyPolicies')}</p>
            </a>
          </InformationContainer>
        </div>
      </ContainerHolder>
    </FooterContainer>
  );
};

export default Footer;

const socialData = [
  { name: 'Instagram', url: '', icon: 'Instagram' },
  { name: 'Twitter', url: '', icon: 'Twitter' },
];

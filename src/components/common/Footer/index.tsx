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
                <div
                  className="socialCircle"
                  key={index}
                  title={item.name}
                ></div>
              ))}
            </div>
          </SocialContainer>

          <ContactContainer>
            <h3>{t('CONTACT')}</h3>
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
          </ContactContainer>

          <InformationContainer>
            <h3>{t('INFORMATION_MANY')}</h3>
            <a href="/terms-and-conditions" title={t('TERMS-AND-CONDITIONS')}>
              <p className="link">{t('TERMS-AND-CONDITIONS')}</p>
            </a>
            <br />
            <a href="/privacy-police" title={t('PRIVACY-POLICIES')}>
              <p className="link">{t('PRIVACY-POLICIES')}</p>
            </a>
          </InformationContainer>
        </div>
        <CopyrightContainer>
          <h4>
            © {new Date().getFullYear()} FINEHOST. {t('ALL-RIGHTS-RESERVED')}
          </h4>
          <p>Lorem ipsum dolor sit amet. Sectus actus dolor.</p>
        </CopyrightContainer>
      </ContainerHolder>
    </FooterContainer>
  );
};

export default Footer;

const socialData = [
  { name: 'Instagram', url: '', icon: '' },
  { name: 'Twitter', url: '', icon: '' },
];

import React from 'react';
import {
  EmailRounded,
  PhoneAndroidRounded,
  PinDropRounded,
} from '@mui/icons-material';
import {
  ContactContainer,
  CopyrightContainer,
  FooterContainer,
  InformationContainer,
  SocialContainer,
} from './styles';
import { OfficeDetails } from '../../../../data/officeDetails';
interface IFooterProps {
  officeDetails: OfficeDetails;
}

const Footer = (props: IFooterProps) => {
  const address = props?.officeDetails?.address;

  return (
    <FooterContainer>
      <div className="topContainer">
        <SocialContainer>
          <h3>{props?.officeDetails?.officeName}</h3>
          <p>{props?.officeDetails?.officeDescription}</p>
          <div className="row">
            {socialData?.map((item, index) => (
              <div className="socialCircle" key={index} title={item.name}></div>
            ))}
          </div>
        </SocialContainer>

        <ContactContainer>
          <h3>Contato</h3>
          <div className="row">
            <EmailRounded style={{ color: '#fff' }} />
            <p>hello@email.com</p>
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
          <h3>Informações</h3>
          <a href="/terms-and-conditions" title={'Termos & Condições'}>
            <p className="link">{'Termos & Condições'}</p>
          </a>
          <br />
          <a href="/privacy-police" title={'Política de Privacidade'}>
            <p className="link">{'Política de Privacidade'}</p>
          </a>
        </InformationContainer>
      </div>
      <CopyrightContainer>
        <h4>© 2022 Exemplo. Todos os direitos reservados</h4>
        <p>Lorem ipsum dolor sit amet. Sectus actus dolor.</p>
      </CopyrightContainer>
    </FooterContainer>
  );
};

export default Footer;

const socialData = [
  { name: 'Instagram', url: '', icon: '' },
  { name: 'Twitter', url: '', icon: '' },
];

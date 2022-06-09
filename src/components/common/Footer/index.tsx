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
interface IFooter {}

const Footer = ({}: IFooter) => {
  return (
    <FooterContainer>
      <div className="topContainer">
        <SocialContainer>
          <h1>Hotel</h1>
          <p>
            Lorem ipsum dolor amet, consectetur adipiscing elit. Eget nisl nunc
            quam ac sed turpis volutpat. Cursus sed massa non nisi, placerat.
          </p>
          <div className="row">
            {socialData.map((item, index) => (
              <div className="socialCircle" key={index} title={item.name}></div>
            ))}
          </div>
        </SocialContainer>

        <ContactContainer>
          <h1>Contato</h1>
          <div className="row">
            <EmailRounded style={{ color: '#fff' }} />
            <p>hello@email.com</p>
          </div>
          <div className="row">
            <PhoneAndroidRounded style={{ color: '#fff' }} />
            <p>+91 98765 43210</p>
          </div>
          <div className="row">
            <PinDropRounded style={{ color: '#fff' }} />
            <p>
              Rua Engenheiro Niemeyer, 215, Centro Joinville - SC | 89201-130
            </p>
          </div>
        </ContactContainer>

        <InformationContainer>
          <h1>Informações</h1>
          <a href="">
            <p className="link">{'Termos & Condições'}</p>
          </a>
          <br />
          <a href="" className="link">
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

import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Globe } from 'react-feather';
import LanguageSwitcher from '../../LanguageSwitcher';
import {
  FooterContainer,
  FooterHolder,
  GlobeContainer,
  LinksAndCopyrightContainer,
  LinksContainer,
  TranslateSocialMediaContainer,
} from './styles';

const FooterCheckout = () => {
  const { t } = useTranslation('common');
  const { locale } = useRouter();
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
      <FooterContainer>
        <FooterHolder>
          <TranslateSocialMediaContainer>
            <GlobeContainer>
              <Globe />
              <h4 onClick={handleLanguageSwitcher} className={'textWithHover'}>
                {languageLabels.map((value, index) => {
                  return value.language === locale
                    ? value.label + ' ' + `(${value.language })`
                    : 'Not found';
                }).filter((value, index) => value !== 'Not found')}
              </h4>
            </GlobeContainer>
          </TranslateSocialMediaContainer>
          <LinksAndCopyrightContainer>
            <h4>© 2022 Hospeda Inc.</h4>
            <LinksContainer>
              <Link href="https://hospeda.in/terms/terms-and-conditions.html" >
                <a title={t('termsAndConditions')} target="_blank">
                  <p className="link">{t('termsAndConditions')}</p>
                </a>
              </Link>

              <Link href="https://hospeda.in/terms/privacy-policy.html">
                <a title={t('privacyPolicies')} target="_blank">
                  <p className="link">{t('privacyPolicies')}</p>
                </a>
              </Link>
            </LinksContainer>
          </LinksAndCopyrightContainer>
        </FooterHolder>
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

export default FooterCheckout;

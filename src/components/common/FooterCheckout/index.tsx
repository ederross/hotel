import { useTranslation } from 'next-i18next';
import Link from 'next/link';
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
                Português {`${'(BR)'}`}
              </h4>
              {/* <h4>R$ BRL</h4> */}
            </GlobeContainer>
          </TranslateSocialMediaContainer>
          <LinksAndCopyrightContainer>
            <h4>© 2022 Finehost, Inc.</h4>
            <LinksContainer>
              <Link href="/terms-and-conditions">
                <a title={t('termsAndConditions')}>
                  <p className="link">{t('termsAndConditions')}</p>
                </a>
              </Link>

              <Link href="/terms-and-conditions">
                <a href="/privacy-police" title={t('privacyPolicies')}>
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

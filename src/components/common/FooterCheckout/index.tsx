import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import React from 'react';
import { Globe } from 'react-feather';
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

  return (
    <>
      <FooterContainer>
        <FooterHolder>
          <TranslateSocialMediaContainer>
            <GlobeContainer>
              <Globe />
              <h4>Português {`${'(BR)'}`}</h4>
            </GlobeContainer>
            <h4>R$ BRL</h4>
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
    </>
  );
};

export default FooterCheckout;

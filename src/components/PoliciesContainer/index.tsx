import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import { Policy } from '../../../data/policies';
import styles from './styles.module.scss';
import { ChevronDown, ChevronUp } from 'react-feather';
interface IPoliciesContainerProps {
  policies: Policy;
}

export const PoliciesContainer = ({ policies }: IPoliciesContainerProps) => {
  const { t } = useTranslation();
  const [policy, setPolicy] = useState(0);
  const [showMoreDescription, setShowMoreDescription] = useState(false);

  return (
    <>
      <div className={styles.webPoliticsContainer}>
        <h3>{t('policy_other')}</h3>
        <h5>
          {t('reservationNonRefundable')}{' '}
          <a title="Políticas de reembolso" href="">
            {t('knowMore')}
          </a>
        </h5>
        <h5>
          Lorem ipsum dolor sit amet{' '}
          <a title="Política de Causas de Força Maior" href="">
            {t('knowMore')}
          </a>
        </h5>
        <div className={styles.policyCardContainer}>
          {policies?.policies?.map((item, index) => (
            <div key={index} className={styles.policyCard}>
              <h3>{item?.PolicyDescription}</h3>
            </div>
          ))}
        </div>

        <h6>
          {policies?.bookTerms?.substring(
            0,
            showMoreDescription ? policies?.bookTerms?.length : 250
          ) || '-'}
          {policies?.bookTerms?.length > 250 && (
            <span
              onClick={() => setShowMoreDescription(!showMoreDescription)}
              style={{ cursor: 'pointer' }}
            >
              {' '}
              {showMoreDescription ? t('showLess') : `...${t('showMore')}`}
            </span>
          )}
        </h6>
      </div>

      <div className={styles.mobPoliticsContainer}>
        <h3>{t('policy_other')}</h3>
        <h5>
          Lorem ipsum dolor sit amet{' '}
          <a title="Políticas de reembolso" href="">
            {t('knowMore')}
          </a>
        </h5>
        <h5>
          Lorem ipsum dolor sit amet{' '}
          <a title="Política de Causas de Força Maior" href="">
            {t('knowMore')}
          </a>
        </h5>
        <div className={styles.policyCardContainer}>
          <div className={styles.policyCard} onClick={() => setPolicy(0)}>
            <div className={styles.row}>
              <h3>{t('houseRules')}</h3>
              {policy === 0 ? (
                <ChevronUp
                  className={styles.chevronIcon}
                  width={18}
                  height={18}
                />
              ) : (
                <ChevronDown
                  className={styles.chevronIcon}
                  width={18}
                  height={18}
                />
              )}
            </div>
            {policy === 0 && (
              <p>
                Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem
                ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum
                dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit
                amet
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

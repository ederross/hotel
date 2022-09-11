import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import { Policy } from '../../../data/policies';
import styles from './styles.module.scss';
import { ChevronDown, ChevronUp } from 'react-feather';
import { IconImportDynamically } from '../common/ComponentWithIcon';
import { useSelector } from 'react-redux';
import { AppStore } from '../../store/types';
interface IPoliciesContainerProps {
  policies: Policy;
  handleBookingPolicies: () => void;
}

export const PoliciesContainer = ({
  policies,
  handleBookingPolicies,
}: IPoliciesContainerProps) => {
  const { t } = useTranslation();
  const [policy, setPolicy] = useState(0);
  const [showMoreDescription, setShowMoreDescription] = useState(false);

  const {
    domain: { policyTypeDomain },
  } = useSelector((state: AppStore) => state);

  return (
    <>
      <div className={styles.webPoliticsContainer}>
        <h3>{t('policy_other')}</h3>
        <h5>
          {t('bookingPolicies')}{' '}
          <a
            title="Políticas de reembolso"
            style={{ cursor: 'pointer' }}
            onClick={handleBookingPolicies}
          >
            {t('knowMore')}
          </a>
        </h5>
        <div className={styles.policyCardContainer}>
          {policies?.policies?.map((item, index) => (
            <div key={index} className={styles.policyCard}>
              <h3>
                {policyTypeDomain?.data?.find(
                  (p) => p.domainItemCode === item.PolicyTypeCode
                )?.domainItemValue || '-'}
              </h3>
              <h4>{item.PolicyDescription}</h4>
              {item?.Rules?.map((rule, index) => (
                <div className={styles.row} key={index}>
                  <IconImportDynamically
                    iconName={rule?.DisplayIconTypeCode}
                    size={20}
                  />
                  <p>{rule?.PolicyRuleDescription || '-'}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
        <h3>{t('additionalInfos')}</h3>
        <h6>
          {policies?.additionalInfo?.substring(
            0,
            showMoreDescription ? policies?.additionalInfo?.length : 250
          ) || '-'}
          {policies?.additionalInfo?.length > 250 && (
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
          <a title="Políticas de reembolso">{t('knowMore')}</a>
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

import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';
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
  const [policy, setPolicy] = useState(1);
  const [showMoreDescription, setShowMoreDescription] = useState(false);

  const {
    domain: { policyTypeDomain },
  } = useSelector((state: AppStore) => state);

  return (
    <>
      <div className={styles.webPoliticsContainer}>
        <h3>{t('policy')}</h3>
        <h5>
          {t('reservationPolicies')}{' '}
          <a
            title="Políticas de reembolso"
            style={{ cursor: 'pointer' }}
            onClick={handleBookingPolicies}
          >
            {t('knowMore')}
          </a>
        </h5>
        <div className={styles.policyCardContainer}>
          <div className={styles.policyCard}>
            <h3>{t('accommodationRules')}</h3>
            <h6 style={{ marginTop: 16 }}>{t('checkIn')}</h6>
            <div className={styles.row}>
              <IconImportDynamically iconName={1517} size={20} />
              <p>{policies.bookPolicy.checkinWindow.startTime}</p>
            </div>
            <h6 style={{ marginTop: 16 }}>{t('checkOut')}</h6>
            <div className={styles.row}>
              <IconImportDynamically iconName={1517} size={20} />
              <p>{policies.bookPolicy.checkoutTime.endTime}</p>
            </div>
            <h6 style={{ marginTop: 16 }}>{t('upFrontPercentage')}</h6>
            <div className={styles.row}>
              <IconImportDynamically iconName={1285} size={20} />
              <p>{policies.upfrontPercentage || 0}%</p>
            </div>
          </div>
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
        <h3>{t('policy')}</h3>
        <h5>
          {t('reservationPolicies')}{' '}
          <a
            title="Políticas de reembolso"
            style={{ cursor: 'pointer' }}
            onClick={handleBookingPolicies}
          >
            {t('knowMore')}
          </a>
        </h5>
        <div className={styles.policyCardContainer}>
          <div className={styles.policyCard}>
            <div className={styles.row} style={{ marginTop: 24 }}>
              <h3>{t('accommodationRules')}</h3>
            </div>
            <div style={{ marginBottom: 32 }}>
              <h6 style={{ marginTop: 16 }}>{t('checkIn')}</h6>
              <div className={styles.row}>
                <IconImportDynamically iconName={1517} size={20} />
                <p>{policies.bookPolicy.checkinWindow.startTime}</p>
              </div>
              <h6 style={{ marginTop: 16 }}>{t('checkOut')}</h6>
              <div className={styles.row}>
                <IconImportDynamically iconName={1517} size={20} />
                <p>{policies.bookPolicy.checkoutTime.endTime}</p>
              </div>
              <h6 style={{ marginTop: 16 }}>{t('upFrontPercentage')}</h6>
              <div className={styles.row}>
                <IconImportDynamically iconName={1285} size={20} />
                <p>{policies.upfrontPercentage}%</p>
              </div>
            </div>
            {policies?.policies?.map((item, policeIndex) => (
              <div key={policeIndex} className={styles.policyCard}>
                <div
                  className={styles.row}
                  onClick={() => setPolicy(policeIndex)}
                >
                  <h3>
                    {policyTypeDomain?.data?.find(
                      (p) => p.domainItemCode === item.PolicyTypeCode
                    )?.domainItemValue || '-'}
                  </h3>
                  {policy === policeIndex ? (
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
                {policy === policeIndex && (
                  <>
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
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

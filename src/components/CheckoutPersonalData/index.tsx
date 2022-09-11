import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useWindowSize } from '../../hooks/UseWindowSize';
import { currency } from '../../utils/currency';
import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
import { AppStore } from '../../store/types';
import Input from '../common/Input';
import InputWithMask from '../common/InputWithMask';
import {
  IClientBooking,
  IPaymentBooking,
} from '../../services/requests/booking';
import dynamic from 'next/dynamic';

const CreditCard = dynamic(() => import('../CreditCard'), {
  ssr: false,
});

interface ICheckoutPersonalData {
  client: IClientBooking;
  setClient: React.Dispatch<React.SetStateAction<IClientBooking>>;
  paymentBooking: IPaymentBooking;
  setPaymentBooking: React.Dispatch<React.SetStateAction<IPaymentBooking>>;
  selectedPayMethodDetails: number;
  setSelectedPayMethodDetails: React.Dispatch<React.SetStateAction<number>>;
  fieldErrors: {
    name: string;
    email: string;
    phone: string;
    cpf: string;
    cardNumber: string;
    expiryYear: string;
    securityCode: string;
  };
}

export const CheckoutPersonalData = ({
  setClient,
  client,
  paymentBooking,
  setPaymentBooking,
  selectedPayMethodDetails,
  setSelectedPayMethodDetails,
  fieldErrors,
}: ICheckoutPersonalData) => {
  const size = useWindowSize();
  const { t } = useTranslation();

  const {
    checkout: { data: checkout },
    domain: { paymentMethodTypeDomain },
  } = useSelector((state: AppStore) => state);

  const [cardNumber, setCardNumber] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [securityCode, setSecurityCode] = useState<any>();

  const [selectedPayMethod, setSelectedPayMethod] = useState(
    checkout[0]?.paymentMethodTypeCode || 0
  );

  const handleChangeData = (rest: any) => {
    setClient({ ...client, ...rest });
  };

  useEffect(() => {
    const currentPaymentDetails = checkout?.find(
      (c) => c.paymentMethodTypeCode === selectedPayMethod
    )?.paymentDetails[selectedPayMethodDetails];

    setPaymentBooking({
      installmentCount: currentPaymentDetails?.paymentInstallmentCount || 0,
      paymentMethod: {
        methodDetails:
          selectedPayMethod === 1
            ? [
                {
                  cardSchemeTypeCode: 1,
                  encryptedCardNumber: cardNumber,
                  encryptedExpiryYear: expiryYear,
                  encryptedSecurityCode: securityCode,
                },
              ]
            : null,
        paymentDetails: [
          {
            paymentInstallmentCount:
              currentPaymentDetails?.paymentInstallmentCount,
            paymentTotalAmount: currentPaymentDetails?.paymentTotalAmount,
          },
        ],
        paymentMethodTypeCode: selectedPayMethod,
      },
      totalAmont: selectedPayMethod,
    });
  }, [selectedPayMethod, cardNumber, expiryYear, securityCode, checkout]);

  return (
    <div className={styles.mobPersonalDataContainer}>
      <h3>{t('personalData')}</h3>

      <Input
        label={t('name')}
        type="text"
        name={t('name')}
        placeholder={t('name')}
        value={client?.clientName}
        setValue={(v) => handleChangeData({ clientName: v })}
        downMessage={fieldErrors?.name}
      />
      <Input
        label={t('email')}
        type="text"
        name="Nome"
        placeholder="Nome"
        value={client?.contacts[0].contactText}
        setValue={(v) =>
          handleChangeData({
            contacts: client.contacts.map((item, index) => {
              return index === 0
                ? {
                    contactTypeCode: item.contactTypeCode,
                    contactText: v,
                  }
                : item;
            }),
          })
        }
        downMessage={fieldErrors?.email}
      />

      <InputWithMask
        label={t('phoneNumber')}
        typeInput="PHONE"
        name={t('phoneNumber')}
        placeholder={t('phoneNumber')}
        value={
          client?.contacts[1].StatePhoneCode +
            client?.contacts[1].PhoneNumber || ''
        }
        setValue={(v) =>
          handleChangeData({
            contacts: client.contacts.map((item, index) => {
              return index === 1
                ? {
                    contactTypeCode: item.contactTypeCode,
                    CountryPhoneCode: '55',
                    PhoneNumber: v.replace(/[^0-9]+/g, '').substring(2, 11),
                    StatePhoneCode: v.replace(/[^0-9]+/g, '').substring(0, 2),
                  }
                : item;
            }),
          })
        }
        downMessage={fieldErrors?.phone}
      />

      <InputWithMask
        label={'CPF'}
        typeInput="CPF"
        name="CPF"
        placeholder="CPF"
        value={client?.documentNumber}
        setValue={(v) =>
          handleChangeData({ documentNumber: v.replace(/[^0-9]+/g, '') })
        }
        downMessage={fieldErrors?.cpf}
      />

      <div className={styles.divisorContainer} style={{ marginBottom: 12 }}>
        <div></div>
      </div>

      <div className={styles.payWithContainer}>
        <h3 className={styles.title}>{t('paymentMethod')}</h3>
        <div className={styles.payWithLogosContainer}>
          {checkout.find((c) => c.paymentMethodTypeCode === 1) && (
            <div className={styles.payWithLogosBox}>
              <Image
                src={'/icons/card.svg'}
                layout={'fill'}
                objectFit={'contain'}
                alt={'Credit Card Logo'}
              />
            </div>
          )}
          {checkout.find((c) => c.paymentMethodTypeCode === 4) && (
            <div className={styles.payWithLogosBox}>
              <Image
                src={'/icons/bank.svg'}
                layout={'fill'}
                objectFit={'contain'}
                alt={'Credit Card Logo'}
              />
            </div>
          )}
          {checkout.find((c) => c.paymentMethodTypeCode === 3) && (
            <div className={styles.payWithLogosBox}>
              <Image
                src={'/icons/pix.svg'}
                layout={'fill'}
                objectFit={'contain'}
                alt={'Credit Card Logo'}
              />
            </div>
          )}
        </div>
      </div>

      <div className={styles.cSelect} style={{ marginBottom: '0.5rem' }}>
        <select
          name="arrivalForecast"
          style={{ margin: '0 0 16px' }}
          onChange={(e) => setSelectedPayMethod(parseInt(e.target.value))}
        >
          {checkout?.map((item, index) => (
            <option key={index} value={item?.paymentMethodTypeCode}>
              {paymentMethodTypeDomain?.data?.find(
                (domain) =>
                  domain.domainItemCode === item?.paymentMethodTypeCode
              )?.domainItemValue || item?.paymentMethodTypeCode}
            </option>
          ))}
        </select>
      </div>
      {selectedPayMethod && (
        <div className={styles.cSelect} style={{ marginBottom: '0.5rem' }}>
          <select
            name="arrivalForecast"
            id="det-select"
            style={{ margin: '0 0 8px' }}
            onChange={(e) =>
              setSelectedPayMethodDetails(parseInt(e.target.value))
            }
          >
            {checkout
              ?.find((c) => c.paymentMethodTypeCode === selectedPayMethod)
              .paymentDetails.sort(
                (a: any, b: any) => b.isDownPayment - a.isDownPayment
              )
              .map((item, index) => (
                <option key={index} value={index}>
                  {item?.paymentInstallmentCount}
                  {'x de '}
                  {currency(item.firstInstallmentAmount)}
                  {item?.isDownPayment ? ' (pagamento sinal)' : ''}
                </option>
              ))}
          </select>
        </div>
      )}
      {selectedPayMethod === 1 && (
        <CreditCard
          cardNumber={cardNumber}
          expiryYear={expiryYear}
          securityCode={securityCode}
          setCardNumber={setCardNumber}
          setExpiryYear={setExpiryYear}
          setSecurityCode={setSecurityCode}
          fieldErrors={fieldErrors}
        />
      )}
    </div>
  );
};

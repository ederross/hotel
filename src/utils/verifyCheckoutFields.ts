import { IClientBooking, IPaymentBooking } from '../services/requests/booking';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';
import { emailValidator } from './currency';

export const VerifyCheckoutFields = (
  client: IClientBooking,
  paymentBooking: IPaymentBooking,
  setFieldErrors: React.SetStateAction<any>
) => {
  const verifyName = client?.clientName.length < 2;
  const verifyEmail = !emailValidator(client?.contacts[0]?.contactText);
  const verifyCPF = !cpfValidator.isValid(
    client?.documentNumber.replace(/[^0-9]+/g, '')
  );
  const verifyPhone =
    (
      client?.contacts[1]?.StatePhoneCode + client?.contacts[1]?.PhoneNumber
    ).replace(/[^0-9]+/g, '').length < 8;

  const hasCreditCard =
    paymentBooking?.paymentMethod.paymentMethodTypeCode === 1;

  const validCardNumber =
    hasCreditCard &&
    !!paymentBooking?.paymentMethod?.methodDetails[0].encryptedCardNumber;

  const validExpiryYear =
    hasCreditCard &&
    !!paymentBooking?.paymentMethod?.methodDetails[0].encryptedExpiryYear;
  const validSecurityCode =
    hasCreditCard &&
    paymentBooking?.paymentMethod?.methodDetails[0]?.encryptedSecurityCode
      ?.length === 3;

  const hasValidCard =
    !hasCreditCard || (validCardNumber && validExpiryYear && validSecurityCode);

  setFieldErrors({
    name: verifyName ? 'Digite o nome completo.' : '',
    email: verifyEmail ? 'Digite um e-mail válido.' : '',
    phone: verifyPhone ? 'Digite um número de celular válido.' : '',
    cpf: verifyCPF ? 'Digite um CPF válido.' : '',
    cardNumber: validCardNumber ? '' : 'Digite o número do cartão',
    expiryYear: validExpiryYear ? '' : 'Digite a validade',
    securityCode: validSecurityCode ? '' : 'Digite o número de segurança',
  });

  return (
    !verifyName && !verifyPhone && !verifyCPF && !verifyEmail && hasValidCard
  );
};

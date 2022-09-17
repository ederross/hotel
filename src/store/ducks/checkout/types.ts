export const Types = {
  SET_CHECKOUT: '@checkout/SET_CHECKOUT',
};

export interface TypesCheckout {
  data: PaymethodTypes[];
  loading: boolean;
  error: boolean;
}

export interface PaymethodTypes {
  paymentMethodTypeCode: number;
  paymentDetails: paymentDetailsTypes[];
  methodDetails: methodDetailsTypes[];
}

export interface paymentDetailsTypes {
  paymentInstallmentCount: number;
  paymentTotalAmount: number;
  firstInstallmentAmount: number;
  isDownPayment: boolean;
}

export interface methodDetailsTypes {
  bankCode: string;
  bankName: string;
  branch: string;
  account: string;
  accountDigit: string;
  addInformation: string;
  deadlinePaymentDate: string;
  qrCodeUrl: string;
  keyCode: string;
}

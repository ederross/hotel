export interface Policy {
  bookPolicy: {
    checkinWindow: {
      startTime: string;
      endTime: string;
    };
    checkoutTime: {
      startTime: string;
      endTime: string;
    };
  };
  policies: Policies[];
  additionalInfo: string;
  upfrontPercentage: number;
  bookTerms: string;
  taxPolicy: {
    FeeTypeCode: number;
    Description: string;
  };
  feePolicy: {
    FeeTypeCode: number;
    Description: string;
  };
}

interface Policies {
  PolicyTypeCode: number;
  PolicyDescription: string;
  Rules: Rule[];
}

interface Rule {
  PolicyRuleTypeCode: number;
  PolicyRuleDescription: string;
  DisplayIconTypeCode: number;
  IsAllowed: boolean;
}

export interface Policy {
  bookPolicy: {
    checkinWindow: {
      startTime: string;
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

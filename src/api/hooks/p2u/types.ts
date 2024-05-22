export interface UserRPAHistory {
  approvalAmount: string;
  merchantKind: string;
  status: number;
  approvalDate: string;
  cardKind: string;
  merchantName: string;
  email: string;
  estimatedPaymentDate: string;
  paymentStatus: string;
  salesType: string;
  cardNumber: string;
  isAccumulated: false;
  installment: string;
  id: string;
  salesFranchiseName: string;
  threshold: number;
  domesticType: string;
  cancelDate: string;
  createdAt: string;
  percentage: number;
  merchantCode: string;
  approvalTime: string;
  merchantAddress: string;
  isAffiliated: false;
  companyCode: string;
  businessNumber: string;
  merchantRepresentativeName: string;
  approvalNumber: string;
  cardNumberFormat: string;
  merchantPhone: string;
  amount: number;
  currencyCode: string;
  point: number;
}

export interface GetUserRPAHistoryResp {
  result: string;
  numberOfQueue: number;
  numberOfFlight: number;
  numberOfCardQueue: number;
  numberOfCardFlight: number;
  lastRPACallTime: string;
  getUserRPAHistory: UserRPAHistory[];
  lastId: string;
  lastEmail: string;
  nbElements: number;
  hasNext: boolean;
}

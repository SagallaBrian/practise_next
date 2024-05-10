export interface tokenSearchInput {
  limit?: number;
  lastId?: string;
  searchKey?: string;
}

export interface TokenData {
  name: string;
  address: string;
  total_tokens: number;
  onChain: boolean;
  swappable: boolean;
  isApproved: boolean;
  platform_id: string;
  updatedAt: string;
  createdAt: string;
  status: number;
  price: number;
  logo: string;
}

export interface GetAllTokensResp {
  allTokensData: TokenData[];
  lastId?: string;
  hasNext: boolean;
  nbTotalElements: number;
  nbElements: number;
  message: string;
}

export interface ScrollAllTokenResp {
  pages: GetAllTokensResp[];
  pageParams: string[];
}

import { Company } from './company';

export enum CompanyBusInd {
  COMPANIES = 'C',
  BUSINESS_NAMES = 'B',
  BOTH = 'E',
}

export enum SeachType {
  EXACT_MATCH = 1,
  STARTS_WITH = 2,
  CONTAINS = 3,
}

type SortOptions =
  | 'company_num'
  | 'company_bus_ind'
  | 'company_name'
  | 'company_addr_1'
  | 'company_addr_2'
  | 'company_addr_3'
  | 'company_addr_4'
  | 'company_reg_date'
  | 'company_status_desc'
  | 'company_status_date'
  | 'last_ar_date'
  | 'next_ar_date'
  | 'last_acc_date'
  | 'comp_type_desc';

type SearchParamsBase = {
  alpha?: string;
  companyBusInd?: CompanyBusInd;
  searchType?: SeachType;
  adress?: string;
  skip?: number;
  max?: number;
  sortBy?: SortOptions;
  sortDir?: string;
  format?: string;
  htmlEnc?: string;
};

type SearchParamsWithName = SearchParamsBase & {
  companyName: string;
};

type SearchParamsWithNum = SearchParamsBase & {
  companyNum: string;
};

export type SearchFunction = (
  params:
    | SearchParamsWithName
    | SearchParamsWithNum
    | (SearchParamsWithName & SearchParamsWithNum)
) => Promise<Company[]>;

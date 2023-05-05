import { Company } from './company';

export enum SeachType {
  EXACT_MATCH = 1,
  STARTS_WITH = 2,
  CONTAINS = 3,
}

type SearchParamsBase = {
  alpha?: string;
  companyBusInd?: string;
  searchType?: string;
  adress?: string;
  skip?: number;
  max?: number;
  sortBy?: string;
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

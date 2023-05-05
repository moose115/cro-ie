import { SearchFunction } from '../types/search';

type Fetcher<T> = (url: string, token: string) => Promise<T>;

type CROClientParams = {
  token?: string;
  fetcher?: Fetcher<any>;
};

const COMPANY_SEARCH_URL = 'http://services.cro.ie/cws/companies';

const defaultFetcher: Fetcher<any> = (url, token) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

class CROClient {
  private token: string;
  private fetcher: Fetcher<any>;

  constructor(params: CROClientParams) {
    this.token = params.token || '';
    this.fetcher = params.fetcher || defaultFetcher;
  }

  companySearch: SearchFunction = async (params) => {
    return [];
  };
}

export default CROClient;

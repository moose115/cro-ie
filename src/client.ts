import { Company } from '../types/company';
import { SearchFunction } from '../types/search';

type Fetcher = <T = any>(
  url: string,
  token: string
) => Promise<{ data?: T; status: number }>;

type CROClientParams = {
  token?: string;
  fetcher?: Fetcher;
};

const defaultFetcher: Fetcher = (url, token) =>
  fetch(url, {
    headers: {
      Authorization: `Basic ${token}`,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json().then((data) => ({ data, status: res.status }));
    } else {
      return { status: res.status };
    }
  });

class CROClient {
  private token: string;
  private fetcher: Fetcher;

  constructor(params: CROClientParams) {
    this.token = params.token || '';
    this.fetcher = params.fetcher || defaultFetcher;
  }

  companySearch: SearchFunction = async (params) => {
    const COMPANY_SEARCH_URL = 'http://services.cro.ie/cws/companies';
    const url = new URL(COMPANY_SEARCH_URL);

    if ('companyNum' in params)
      url.searchParams.set('company_num', params.companyNum);
    if ('companyName' in params)
      url.searchParams.set('company_name', params.companyName);
    else url.searchParams.set('alpha', params.alpha || '');

    url.searchParams.set('company_bus_ind', params.companyBusInd || '');
    url.searchParams.set('search_type', params.searchType?.toString() || '');
    url.searchParams.set('adress', params.adress || '');
    url.searchParams.set('skip', params.skip?.toString() || '');
    url.searchParams.set('max', params.max?.toString() || '');
    url.searchParams.set('sort_by', params.sortBy || '');
    url.searchParams.set('sort_dir', params.sortDir || '');
    url.searchParams.set('htmlEnc', params.htmlEnc || '');

    url.searchParams.set('format', params.format || 'json');

    try {
      const { data, status } = await this.fetcher<Company[]>(
        url.toString(),
        this.token
      );
      if (status === 200) {
        return data || [];
      } else {
        throw new Error(`CRO API returned status ${status}`);
      }
    } catch (err) {
      throw new Error(`CRO API returned error: ${err.message}`);
    }
  };

  getCompany = async (
    companyNum: string,
    company_bus_ind: 'b' | 'c',
    htmlEnc: 0 | 1 = 0
  ) => {
    const COMPANY_URL = `http://services.cro.ie/cws/company/${companyNum}/${company_bus_ind}?format=json&htmlEnc=${htmlEnc}`;
    try {
      const { data, status } = await this.fetcher<Company>(
        COMPANY_URL,
        this.token
      );
      if (status === 200) {
        return data;
      } else {
        throw new Error(`CRO API returned status ${status}`);
      }
    } catch (err) {
      throw new Error(`CRO API returned error: ${err.message}`);
    }
  };
}

export default CROClient;

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

const COMPANY_SEARCH_URL = 'http://services.cro.ie/cws/companies';

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
    const url = new URL(COMPANY_SEARCH_URL);

    if ('companyName' in params)
      url.searchParams.set('company_name', params.companyName);
    if ('companyNum' in params)
      url.searchParams.set('company_num', params.companyNum);

    url.searchParams.set('alpha', params.alpha || '');
    url.searchParams.set('company_bus_ind', params.companyBusInd || '');
    url.searchParams.set('search_type', params.searchType || '');
    url.searchParams.set('adress', params.adress || '');
    url.searchParams.set('skip', params.skip?.toString() || '');
    url.searchParams.set('max', params.max?.toString() || '');
    url.searchParams.set('sort_by', params.sortBy || '');
    url.searchParams.set('sort_dir', params.sortDir || '');
    url.searchParams.set('html_enc', params.htmlEnc || '');

    url.searchParams.set('format', 'json');

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
}

export default CROClient;

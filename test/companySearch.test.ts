import { CROClient } from '../src';
import { test, expect } from '@jest/globals';

const TEST_TOKEN =
  'dGVzdEBjcm8uaWU6ZGEwOTNhMDQtYzlkNy00NmQ3LTljODMtOWM5Zjg2MzBkNWUw'; // test token from docs

test('search for company name "ryanair", expect a non-empty array of companies', async () => {
  const cro = new CROClient({ token: TEST_TOKEN });
  const companies = await cro.companySearch({ companyName: 'ryanair' });
  expect(companies.length).toBeGreaterThan(0);
});

test('search for company number "83740", expect a non-empty array of companies', async () => {
  const cro = new CROClient({ token: TEST_TOKEN });
  const companies = await cro.companySearch({ companyNum: '83740' });
  expect(companies.length).toBeGreaterThan(0);
});

test('should throw an error when no/an incorrect token is provided', async () => {
  const cro = new CROClient({ token: 'wrongtoken' });
  await expect(cro.companySearch({ companyName: 'ryanair' })).rejects.toThrow(
    'CRO API returned status 401'
  );
});

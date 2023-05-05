import { CROClient } from '../src';
import { test, expect } from '@jest/globals';

const TEST_TOKEN =
  'dGVzdEBjcm8uaWU6ZGEwOTNhMDQtYzlkNy00NmQ3LTljODMtOWM5Zjg2MzBkNWUw'; // test token from docs

test('search for companies names "ryanair", expect a non-empty array of companies', async () => {
  const cro = new CROClient({ token: TEST_TOKEN });
  const companies = await cro.companySearch({ companyName: 'ryanair' });
  expect(companies.length).toBeGreaterThan(0);
});

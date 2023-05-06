import { test, expect } from '@jest/globals';
import CROClient from '../src/client';

const TEST_TOKEN =
  'dGVzdEBjcm8uaWU6ZGEwOTNhMDQtYzlkNy00NmQ3LTljODMtOWM5Zjg2MzBkNWUw'; // test token from docs

test('search company number 83740, expect "FOSTER WHEELER IRELAND LIMITES"', async () => {
  const client = new CROClient({ token: TEST_TOKEN });
  const result = await client.getCompany('83740', 'c');
  expect(result?.company_name).toBe('FOSTER WHEELER IRELAND LIMITED');
});

test('search business name number 373674, expect "GOOGLE REGISTRY COPYRIGHTS"', async () => {
  const client = new CROClient({ token: TEST_TOKEN });
  const result = await client.getCompany('373674', 'b');
  expect(result?.company_name).toBe('GOOGLE REGISTRY COPYRIGHTS');
});

test('expect wrong number to throw error', async () => {
  const client = new CROClient({ token: TEST_TOKEN });
  await expect(client.getCompany('123456', 'c')).rejects.toThrow();
});

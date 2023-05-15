import { json } from '@sveltejs/kit';
import { POLYGON_API_KEY, POLYGON_API_BASE_URL } from '$env/static/private';
import { getQueryParams } from '$lib/utils/other';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ fetch, request, url, locals }) => {
  if (!locals?.user?.isAuthenticated) {
    return json(
      { success: false, error: 'User not authenticated' },
      { status: 401 }
    );
  }
  const { ticker }: { ticker: string } = await request.json();
  const resource1 = `/v3/reference/tickers${ticker}`;
  const resource2 = `/v2/snapshot/locale/us/markets/stocks/tickers/${ticker}`;
  const query = getQueryParams({
    apiKey: POLYGON_API_KEY,
  }).toString();
  const [data1, data2] = await Promise.all([
    fetch(POLYGON_API_BASE_URL + resource1 + `?${query}`)
      .then((res) => res.json())
      .catch((err) => undefined),
    fetch(POLYGON_API_BASE_URL + resource2 + `?${query}`)
      .then((res) => res.json())
      .catch((err) => undefined),
  ]);
  if (data1 && data2) {
    const { results }: { results?: any[] } = data1;
    const {
      ticker: { lastQuote: { P } = { P: undefined } } = {
        lastQuote: { P: undefined },
      },
    }: { ticker?: { lastQuote?: { P?: any } } } = data2;
    return json({ success: true, results: { ...results, lastPrice: P } });
  }
  return json(
    { success: false, error: 'Error fetching data' },
    { status: 404 }
  );
};

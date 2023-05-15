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
  const { search }: { search: string } = await request.json();
  const resource = '/v3/reference/tickers';
  const query = getQueryParams({
    search,
    active: 'true',
    sort: 'market',
    order: 'desc',
    market: 'stocks',
    limit: '10',
    apiKey: POLYGON_API_KEY,
  }).toString();
  const res = await fetch(POLYGON_API_BASE_URL + resource + `?${query}`);
  if (res.ok) {
    const { results }: { results?: any[] } = await res.json();
    return json({ success: true, results });
  }
  return json(
    { success: false, error: 'Error fetching data' },
    { status: 404 }
  );
};

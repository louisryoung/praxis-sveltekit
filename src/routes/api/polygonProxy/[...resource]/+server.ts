import { POLYGON_API_KEY, POLYGON_API_BASE_URL } from '$env/static/private';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ fetch, params, url }) => {
  const { resource } = params;
  const res = await fetch(POLYGON_API_BASE_URL + resource + `?${url.search}`, {
    headers: {
      Authorization: `Bearer ${POLYGON_API_KEY}`,
    },
  });
  return res;
};

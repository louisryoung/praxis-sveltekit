import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  return json({
    supported_resolutions: ['1', '5', '15', '30', '60', '1D', '1W', '1M'],
    supports_group_request: true,
    supports_marks: false,
    supports_search: false,
    supports_timescale_marks: false,
  });
};

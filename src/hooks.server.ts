import { sequence } from '@sveltejs/kit/hooks';
import { Toucan } from 'toucan-js';
import * as cookie from 'cookie';
import {
  ENABLE_SENTRY,
  SENTRY_DSN,
  MODE,
  SECRET_KEY,
} from '$env/static/private';
import { refreshToken } from '$lib/server/auth';
import mongoClient from '$lib/db/client';
import { getTokenCookies, verifyJWT } from '$lib/server/utils/token';
import type { Handle, HandleServerError } from '@sveltejs/kit';

const handleAuth: Handle = async ({ event, resolve }) => {
  event.locals.user = undefined;

  let accessTokenCookie: string | undefined,
    refreshTokenCookie: string | undefined;

  const cookies = cookie.parse(event.request.headers.get('cookie') || '');

  if (cookies.access_token) {
    const payload = await verifyJWT(cookies.access_token, SECRET_KEY);
    event.locals.user = {
      id: payload?.sub || '',
      email: (payload?.email as string) || '',
      fullName: (payload?.fullName as string) || '',
      isAuthenticated: true,
    };
  } else if (cookies.refresh_token) {
    const data = await refreshToken(cookies.refresh_token);
    if (data) {
      event.locals.user = {
        id: data.id,
        email: data.email,
        fullName: data.fullName,
        isAuthenticated: true,
      };
      const newCookies = await getTokenCookies({
        url: new URL(event.request.url),
        data,
      });
      ({ accessTokenCookie, refreshTokenCookie } = newCookies);
    }
  }

  const response = await resolve(event);

  accessTokenCookie && response.headers.append('Set-cookie', accessTokenCookie);
  refreshTokenCookie &&
    response.headers.append('Set-cookie', refreshTokenCookie);

  return response;
};

const handleDB: Handle = async ({ event, resolve }) => {
  await mongoClient;
  const response = await resolve(event);
  return response;
};

const handleSSR: Handle = async ({ event, resolve }) => {
  const response = await resolve(event);
  return response;
};

const handleDarkMode: Handle = async ({ event, resolve }) => {
  const response = await resolve(event, {
    transformPageChunk: ({ html, done }) => {
      const cookies = cookie.parse(event.request.headers.get('cookie') || '');
      if (cookies.theme === 'dark') {
        html = html.replace(
          `<html lang="en">`,
          `<html lang="en" class="dark">`
        );
      }
      return html;
    },
  });
  return response;
};

export const handle: Handle = sequence(
  handleDarkMode,
  handleAuth,
  handleDB,
  handleSSR
);

export const handleError: HandleServerError = ({ error, event }) => {
  if (ENABLE_SENTRY === 'true') {
    const Sentry = new Toucan({
      dsn: SENTRY_DSN,
      request: event.request,
    });
    Sentry.setTags({ environment: MODE });
    Sentry.setExtras({ event });
    Sentry.captureException(error);
  }

  console.error(error);

  return {
    message: 'An error occurred',
    code: 500,
  };
};

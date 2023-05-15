import * as cookie from 'cookie';
import * as jose from 'jose';
import { MODE } from '$env/static/private';
import type { JWTPayload } from 'jose';

const ALGORITHM = 'HS256';

const encoder = new TextEncoder();

const epoch = (data: Date) => Math.floor(data.getTime() / 1000);

export const createJWT = async (
  payload: JWTPayload | Record<string, any>,
  secret: string,
  duration: number = 60 * 60 * 24 * 7
) => {
  const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: ALGORITHM, typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime(epoch(new Date()) + duration)
    .sign(encoder.encode(secret));
  return jwt;
};

export const verifyJWT = async (token: string, secret: string) => {
  const { payload, protectedHeader } = await jose.jwtVerify(
    token,
    encoder.encode(secret),
    {
      algorithms: [ALGORITHM],
      typ: 'JWT',
      clockTolerance: 10,
    }
  );
  return payload;
};

export const getTokenCookies = async ({
  url,
  data,
}: {
  url: URL;
  data: {
    access_token: string;
    refresh_token: string;
    expires_in: number;
  };
}) => {
  const domain = url.hostname;
  const { access_token, refresh_token, expires_in } = data;
  const accessTokenCookie = cookie.serialize('access_token', access_token, {
    path: '/',
    domain,
    httpOnly: true,
    secure: MODE === 'production',
    sameSite: 'strict',
    maxAge: expires_in,
  });
  const refreshTokenCookie = cookie.serialize('refresh_token', refresh_token, {
    path: '/',
    domain,
    httpOnly: true,
    secure: MODE === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7,
  });
  return {
    accessTokenCookie,
    refreshTokenCookie,
  };
};

// naive implementation
export const parseJwtPayload = (token: string) => {
  // return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(
    decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    )
  );
};

import { SECRET_KEY } from '$env/static/private';
import TradingAccountSchema from '$lib/db/schemas/TradingAccountSchema';
import UserSchema from '$lib/db/schemas/UserSchema';
import { createJWT, verifyJWT } from '$lib/server/utils/token';
import type { User } from '$lib/types';

const ACCESS_TOKEN_DURATION = 15 * 60;
const REFRESH_TOKEN_DURATION = 7 * 24 * 60 * 60;

export const authenticate = async (credentials: {
  username?: string;
  email?: string;
  password: string;
}) => {
  const INVALID_ERROR = new Error('Invalid username or password');
  const CREDENTIALS_ERROR = new Error('Username or email is required');
  if (!credentials.username && !credentials.email) {
    throw CREDENTIALS_ERROR;
  }
  const user = await UserSchema.findOne({
    $or: [{ username: credentials.username }, { email: credentials.email }],
  });
  if (!user) {
    throw INVALID_ERROR;
  }
  const isPasswordValid = await verifyPassword(
    credentials.password,
    user.password_hash
  );

  if (!isPasswordValid) {
    throw INVALID_ERROR;
  }
  const access_token = await createJWT(
    { sub: user?.id, email: user?.email, fullName: user?.fullName },
    SECRET_KEY,
    ACCESS_TOKEN_DURATION
  );
  const refresh_token = await createJWT(
    { sub: user?.id },
    SECRET_KEY,
    REFRESH_TOKEN_DURATION
  );
  return {
    access_token: access_token,
    refresh_token: refresh_token,
    expires_in: ACCESS_TOKEN_DURATION,
  };
};

export const updateProfile = async (data: Partial<User>) => {
  const { id, ...payload } = data

  await UserSchema.updateOne({id},  {
    $set: payload,
  })

  const user = await UserSchema.findOne({
    id: id,
  });

  if (!user) {
    throw "Faild to update profile";
  }

  return user;
};

export const register = async (data: Partial<User> & { password: string }) => {
  const REGISTRATION_ERROR = new Error('Failed to register user');
  const hashedPassword = await hashPassword(data.password, getRandomSalt());
  const user = await UserSchema.create({
    email: data?.email,
    fullName: data?.fullName,
    id: generateID(),
    password_hash: hashedPassword,
  });
  if (!user) {
    throw REGISTRATION_ERROR;
  }
  const acct = await createTradeAcct(user?.id, 'Main');
  if (!acct) {
    await UserSchema.deleteOne({ id: user?.id });
    throw REGISTRATION_ERROR;
  }
  return user;
};

const createTradeAcct = async (userId: string, name: string) => {
  const user = await UserSchema.findOne({
    id: userId,
  });
  if (!user) {
    return undefined;
  }
  const tradeAcct = await TradingAccountSchema.create({
    name: name,
    id:
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15),
    userID: user.id,
  });
  return tradeAcct;
};

export const signout = () => {
  const opts: RequestInit = {
    method: 'POST',
    headers: {
      // 'Authorization': `Bearer ${token}`,
    },
  };
  // return fetch(`${BACKEND_API_ENDPOINT}${backend.logoutUrl}`, opts);
};

export const refreshToken = async (token: string) => {
  const payload = await verifyJWT(token, SECRET_KEY);
  if (!payload) {
    return null;
  }
  let email = '';
  let fullName = '';
  try {
    const user = await UserSchema.findOne({
      id: payload.sub,
    });
    if (!user) {
      return null;
    }
    email = user.email;
    fullName = user.fullName;
  } catch (e) {
    return null;
  }
  const access_token = await createJWT(
    { sub: payload.sub, email: email, fullName: fullName },
    SECRET_KEY,
    ACCESS_TOKEN_DURATION
  );
  const refresh_token = await createJWT(
    { sub: payload.sub },
    SECRET_KEY,
    REFRESH_TOKEN_DURATION
  );
  return {
    access_token: access_token,
    refresh_token: refresh_token,
    expires_in: ACCESS_TOKEN_DURATION,
    id: payload?.sub || '',
    email: email,
    fullName: fullName,
  };
};

const hashPassword = async (password: string, salt: string) => {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  );
  const hash = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: encoder.encode(salt),
      iterations: 1000,
      hash: 'SHA-256',
    },
    key,
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );
  return (
    salt +
    '$' +
    Array.from(new Uint8Array(await crypto.subtle.exportKey('raw', hash)))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
  );
};

const getRandomSalt = () => {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return [...array].map((b) => b.toString(16).padStart(2, '0')).join('');
};

const verifyPassword = async (password: string, hash: string) => {
  const [salt, key] = hash.split('$');
  const newHash = await hashPassword(password, salt);
  return newHash === hash;
};

const generateID = () => {
  return (
    Math.random().toString(36).substr(2, 9) +
    Date.now().toString(36) +
    Math.random().toString(36).substr(2, 9) +
    Math.random().toString(36).substr(2, 9)
  );
};

import * as cookie from 'cookie';
import { browser } from '$app/environment';
import { darkMode } from '$lib/stores/themes';

export const isDarkMode = (): boolean =>
  (document.documentElement.classList[0] || localStorage.theme || 'light') ===
  'dark';

const setThemeCookie = (theme: string) => {
  if (browser) {
    document.cookie = cookie.serialize('theme', theme, {
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
    });
  }
};

export const checkDarkMode = () => {
  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark');
    darkMode.set(true);
    setThemeCookie('dark');
    return true;
  }
  document.documentElement.classList.remove('dark');
  darkMode.set(false);
  setThemeCookie('light');
  return false;
};

export const toggleDarkMode = (status?: boolean) => {
  if (typeof status === 'undefined') {
    status = isDarkMode();
    document.documentElement.classList.remove('dark');
  }
  if (status) {
    document.documentElement.classList.remove('dark');
    localStorage.theme = 'light';
  } else {
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark';
  }
  darkMode.set(!status);
  return !status;
};

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      user?: {
        id: string;
        email: string;
        fullName: string;
        isAuthenticated?: boolean;
      };
    }
    // interface PageData {}
    // interface Platform {}
  }
}

export {};

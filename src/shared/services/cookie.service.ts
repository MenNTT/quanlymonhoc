// src/services/cookieService.ts
import Cookies from 'js-cookie';
type CookieAttributes = Cookies.CookieAttributes;
class CookieService {
  /**
   * Get a cookie by name.
   * @param name - The name of the cookie.
   * @returns The cookie value or undefined if not found.
   */
  get(name: string): string | undefined {
    return Cookies.get(name);
  }

  /**
   * Set a cookie with a name, value, and options.
   * @param name - The name of the cookie.
   * @param value - The value to store in the cookie.
   * @param options - Additional options for the cookie (e.g., expires, path).
   */
  set(name: string, value: string, options?: CookieAttributes): void {
    Cookies.set(name, value, { ...options, path: '/' });
  }

  /**
   * Remove a cookie by name.
   * @param name - The name of the cookie to remove.
   * @param options - Options for removal (e.g., path).
   */
  remove(name: string, options?: CookieAttributes): void {
    Cookies.remove(name, { ...options, path: '/' });
  }
}

// Create and export a singleton instance of the service.
export const cookieService = new CookieService();

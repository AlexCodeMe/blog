/**
 * An array of routes that do not require auth
 * @type {string[]}
 */
export const publicRoutes = [
    '/',
]

/**
 * An array of used for auth
 * @type {string[]}
 */
export const authRoutes = [
    '/auth/login',
    '/auth/register',
]

/**
 * The prefix for API auth routes
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth'

/**
 * The default redirect path post login
 */
export const DEFAULT_LOGIN_REDIRECT = '/profile'
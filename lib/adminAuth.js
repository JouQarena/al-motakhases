import { cookies } from 'next/headers';

const COOKIE_NAME = 'admin-auth';
const AUTH_TTL_SECONDS = 60 * 60 * 24 * 7;

function getSecretCredentials() {
  return {
    username: process.env.ADMIN_USERNAME || 'admin',
    password: process.env.ADMIN_PASSWORD || 'Motakhases#2026!',
  };
}

export async function createAdminSession(username) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, username, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: AUTH_TTL_SECONDS,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  });
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME)?.value;
  return session || null;
}

export async function requireAdminSession() {
  const session = await getAdminSession();
  return Boolean(session);
}

export async function validateAdminCredentials(username, password) {
  const secret = getSecretCredentials();

  if (username !== secret.username || password !== secret.password) {
    return { success: false, error: 'بيانات الدخول غير صحيحة.' };
  }

  return { success: true };
}

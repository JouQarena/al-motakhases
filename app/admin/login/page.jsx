import { redirect } from 'next/navigation';
import { createAdminSession, getAdminSession, validateAdminCredentials } from '@/lib/adminAuth';

export const metadata = {
  title: 'دخول سري | المتخصص',
};

async function loginAction(formData) {
  'use server';

  const username = formData.get('username')?.toString().trim();
  const password = formData.get('password')?.toString().trim();

  if (!username || !password) {
    redirect('/admin/login?error=missing');
  }

  const result = await validateAdminCredentials(username, password);

  if (!result.success) {
    redirect('/admin/login?error=invalid');
  }

  await createAdminSession(username);
  redirect('/admin');
}

export default async function AdminLoginPage({ searchParams }) {
  const currentSession = await getAdminSession();

  if (currentSession) {
    redirect('/admin');
  }

  const params = await searchParams;
  const error = params?.error;
  const isSecretEntry = params?.secret === '1' || Boolean(error);

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-[4px] border border-soft-divider bg-white p-8 shadow-sm">
        <p className="font-body text-sm tracking-[0.2em] text-accent">دخول سري</p>
        <h1 className="mt-3 font-display text-3xl font-bold text-primary-text">لوحة التحكم</h1>
        <p className="mt-3 text-sm leading-7 text-primary-text/75">
          هذه الصفحة مخصصة للمسؤول فقط وتم الوصول إليها عبر المدخل السري.
        </p>

        {error && (
          <div className="mt-5 rounded-[4px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error === 'missing'
              ? 'من فضلك أدخل اسم المستخدم وكلمة المرور.'
              : 'بيانات الدخول غير صحيحة.'}
          </div>
        )}

        <form action={loginAction} className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-bold text-primary-text" htmlFor="username">
              اسم المستخدم
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="admin"
              className="w-full rounded-[4px] border border-soft-divider px-4 py-3 outline-none ring-0 placeholder:text-primary-text/35 focus:border-accent"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-primary-text" htmlFor="password">
              كلمة المرور
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="********"
              className="w-full rounded-[4px] border border-soft-divider px-4 py-3 outline-none ring-0 placeholder:text-primary-text/35 focus:border-accent"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-[4px] bg-accent px-5 py-3 text-sm font-bold text-white hover:bg-primary-text"
          >
            دخول
          </button>
        </form>
      </div>
    </main>
  );
}

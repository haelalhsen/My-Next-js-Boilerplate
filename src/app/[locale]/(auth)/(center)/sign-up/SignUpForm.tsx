'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { authClient } from '@/libs/AuthClient';

const schema = z.object({
  name: z.string().min(2),
  email: z.email(),
  password: z.string().min(8),
});

type FormData = z.infer<typeof schema>;

export const SignUpForm = (props: { dashboardUrl: string; signInUrl: string }) => {
  const t = useTranslations('SignUp');
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setServerError(null);
    const { error } = await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
    });
    if (error) {
      setServerError(t('error_email_taken'));
      return;
    }
    router.push(props.dashboardUrl);
    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-sm space-y-4 rounded-lg border border-gray-200 bg-white p-8 shadow-sm"
    >
      <h1 className="text-xl font-semibold text-gray-900">{t('meta_title')}</h1>

      {serverError && (
        <p className="rounded bg-red-50 px-3 py-2 text-sm text-red-600">{serverError}</p>
      )}

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700" htmlFor="name">
          {t('name_label')}
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          {...register('name')}
        />
        {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700" htmlFor="email">
          {t('email_label')}
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          {...register('email')}
        />
        {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700" htmlFor="password">
          {t('password_label')}
        </label>
        <input
          id="password"
          type="password"
          autoComplete="new-password"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          {...register('password')}
        />
        {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {t('button_sign_up')}
      </button>

      <p className="text-center text-sm text-gray-500">
        {t('have_account')}{' '}
        <a className="text-blue-600 hover:underline" href={props.signInUrl}>
          {t('sign_in_link')}
        </a>
      </p>
    </form>
  );
};

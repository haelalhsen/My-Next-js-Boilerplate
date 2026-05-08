import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { headers } from 'next/headers';
import { auth } from '@/libs/Auth';

type UserProfilePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: UserProfilePageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'UserProfile' });

  return {
    title: t('meta_title'),
  };
}

export default async function UserProfilePage(props: UserProfilePageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'UserProfile' });
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <div className="my-6 max-w-sm space-y-4 rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
      <h1 className="text-xl font-semibold text-gray-900">{t('meta_title')}</h1>

      <div className="space-y-1">
        <p className="text-sm font-medium text-gray-500">{t('name_label')}</p>
        <p className="text-sm text-gray-900">{session?.user.name}</p>
      </div>

      <div className="space-y-1">
        <p className="text-sm font-medium text-gray-500">{t('email_label')}</p>
        <p className="text-sm text-gray-900">{session?.user.email}</p>
      </div>
    </div>
  );
}

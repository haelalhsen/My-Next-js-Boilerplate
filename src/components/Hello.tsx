import { getTranslations } from 'next-intl/server';
import { headers } from 'next/headers';
import { auth } from '@/libs/Auth';
import { Sponsors } from './Sponsors';

export const Hello = async () => {
  const t = await getTranslations('Dashboard');
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <>
      <p>
        {`👋 `}
        {t('hello_message', {
          email: session?.user.email ?? '',
        })}
      </p>
      <p>
        {t.rich('alternative_message', {
          url: () => (
            <a
              className="text-blue-700 hover:border-b-2 hover:border-blue-700"
              href="https://nextjs-boilerplate.com/pro-saas-starter-kit"
            >
              Next.js Boilerplate Pro
            </a>
          ),
        })}
      </p>
      <p>
        {t.rich('max_message', {
          url: () => (
            <a
              className="text-blue-700 hover:border-b-2 hover:border-blue-700"
              href="https://nextjs-boilerplate.com/nextjs-multi-tenant-saas-boilerplate"
            >
              Next.js Boilerplate Max
            </a>
          ),
        })}
      </p>
      <Sponsors />
    </>
  );
};

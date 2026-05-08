import { arSA, enUS, frFR } from '@clerk/localizations';
import type { LocalizationResource } from '@clerk/shared/types';
import type { LocalePrefixMode } from 'next-intl/routing';

/** Locale prefix strategy for next-intl routing. */
const localePrefix: LocalePrefixMode = 'as-needed';

// FIXME: Update this configuration file based on your project information
export const AppConfig = {
  name: 'Nextjs Starter',
  i18n: {
    locales: ['en', 'fr', 'ar'],
    defaultLocale: 'en',
    localePrefix,
  },
};

const supportedLocales: Record<string, LocalizationResource> = {
  en: enUS,
  fr: frFR,
  ar: arSA,
};

export const ClerkLocalizations = {
  defaultLocale: enUS,
  supportedLocales,
};

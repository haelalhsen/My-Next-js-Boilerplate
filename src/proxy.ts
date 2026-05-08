import { detectBot } from '@arcjet/next';
import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import arcjet from '@/libs/Arcjet';
import { routing } from './libs/I18nRouting';

const handleI18nRouting = createMiddleware(routing);

const aj = arcjet.withRule(
  detectBot({
    mode: 'LIVE',
    allow: ['CATEGORY:SEARCH_ENGINE', 'CATEGORY:PREVIEW', 'CATEGORY:MONITOR'],
  }),
);

const isDashboardRoute = (pathname: string) =>
  pathname === '/dashboard' ||
  pathname.startsWith('/dashboard/') ||
  /^\/[a-z]{2}(-[A-Z]{2})?(\/dashboard)(\/.*)?$/.test(pathname);

export default async function proxy(request: NextRequest) {
  if (process.env.ARCJET_KEY) {
    const decision = await aj.protect(request);

    if (decision.isDenied()) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
  }

  if (isDashboardRoute(request.nextUrl.pathname)) {
    const sessionToken =
      request.cookies.get('better-auth.session_token')?.value ??
      request.cookies.get('__Secure-better-auth.session_token')?.value;

    if (!sessionToken) {
      const localePrefix =
        request.nextUrl.pathname.match(/^(\/[a-z]{2}(-[A-Z]{2})?)\/dashboard/)?.at(1) ?? '';
      const signInUrl = new URL(`${localePrefix}/sign-in`, request.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: '/((?!_next|_vercel|monitoring|api|.*\\..*).*)',
};

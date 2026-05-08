import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { accountSchema, sessionSchema, userSchema, verificationSchema } from '@/models/Schema';
import { db } from './DB';
import { Env } from './Env';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user: userSchema,
      session: sessionSchema,
      account: accountSchema,
      verification: verificationSchema,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  secret: Env.BETTER_AUTH_SECRET,
  ...(Env.NEXT_PUBLIC_APP_URL ? { baseURL: Env.NEXT_PUBLIC_APP_URL } : {}),
});

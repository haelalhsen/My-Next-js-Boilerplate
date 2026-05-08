'use client';

import { useRouter } from 'next/navigation';
import { authClient } from '@/libs/AuthClient';

export const SignOutButton = (props: { children: React.ReactNode; afterSignOutUrl: string }) => {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push(props.afterSignOutUrl);
    router.refresh();
  };

  return (
    <button
      className="border-none text-gray-700 hover:text-gray-900"
      type="button"
      onClick={handleSignOut}
    >
      {props.children}
    </button>
  );
};

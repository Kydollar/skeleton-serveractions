'use client';

import { FC, ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

interface NextAuthSessionProviderProps {
    children?: ReactNode;
}

const NextAuthSessionProvider: FC<NextAuthSessionProviderProps> = ({
    children,
}) => {
    return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthSessionProvider;

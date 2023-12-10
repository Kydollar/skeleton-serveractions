import { ReactNode } from 'react';
import NextTopLoader from 'nextjs-toploader';

import type { Metadata, Viewport } from 'next';

import '@/styles/globals.css';

import site from '@/constants/site.json';

import { fontSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { TooltipProvider } from '@/components/ui/tooltip';
import NextAuthSessionProvider from '@/components/providers/next-auth-session';
import ClientProvider from '@/components/providers/next-client';
import NextThemeProvider from '@/components/providers/next-theme';

export const metadata: Metadata = {
    title: {
        default: site.name,
        template: `%s - ${site.name}`,
    },
    description: site.description,
    creator: site.name,
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon-16x16.png',
        apple: '/apple-touch-icon.png',
    },
    verification: {
        google: '',
    },
    // keywords: keywords,
    // metadataBase: new URL(site.url),
    alternates: {
        canonical: '/',
    },
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};

export default function RootLayout({
    children,
    authModal,
}: {
    children: React.ReactNode;
    authModal: ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    fontSans.className,
                    'overflow-x-hidden antialiased'
                )}
            >
                <NextTopLoader color="#fff" showSpinner={false} />
                <NextThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <TooltipProvider
                        disableHoverableContent
                        delayDuration={500}
                        skipDelayDuration={0}
                    >
                        <NextAuthSessionProvider>
                            {authModal}
                            <main className="container py-8">{children}</main>
                            <ClientProvider />
                        </NextAuthSessionProvider>
                    </TooltipProvider>
                </NextThemeProvider>
            </body>
        </html>
    );
}

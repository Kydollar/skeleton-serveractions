'use client';

import { useTheme } from 'next-themes';
import { Toaster } from 'sonner';

type ThemeType = 'light' | 'dark' | 'system';

export default function NextClientProvider() {
    const { theme } = useTheme();
    const typedTheme: ThemeType = theme as ThemeType;

    return (
        <Toaster
            richColors={true}
            theme={typedTheme}
            toastOptions={{
                className: '!rounded-md',
            }}
        />
    );
}

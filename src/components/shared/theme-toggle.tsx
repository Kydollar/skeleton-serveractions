'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';

import useMounted from '@/lib/hooks/useMounted';
import { SwitchWithIcon } from '@/components/ui/switch';
import { Icons } from '@/components/shared/icons';

import { Skeleton } from '../ui/skeleton';

export function ThemeToggle({ uniqueId }: { uniqueId?: string }) {
    const mounted = useMounted();
    const { setTheme, theme, resolvedTheme } = useTheme();

    // Generate unique IDs for the switch and icons
    const switchId = `themeSwitch-${uniqueId}`;
    const moonIconId = `moonIcon-${uniqueId}`;
    const sunIconId = `sunIcon-${uniqueId}`;

    return mounted ? (
        <SwitchWithIcon
            id={switchId}
            checked={resolvedTheme === 'dark'}
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
            <Icons.moon
                id={moonIconId}
                className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-75"
            />
            <Icons.sun
                id={sunIconId}
                className="rotate-0 scale-75 transition-all dark:-rotate-90 dark:scale-0"
            />
            <span className="sr-only">Toggle theme</span>
        </SwitchWithIcon>
    ) : (
        <Skeleton className="h-5 w-11 animate-pulse rounded-full bg-muted" />
    );
}

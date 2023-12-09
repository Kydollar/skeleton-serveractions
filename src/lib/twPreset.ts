import { twPlugin } from './twPlugin';

import type { Config } from 'tailwindcss';

export const twPreset = {
    darkMode: 'class',
    content: [],
    plugins: [require('tailwindcss-animate'), twPlugin],
} satisfies Config;

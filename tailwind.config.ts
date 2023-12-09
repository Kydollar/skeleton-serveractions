import type { Config } from "tailwindcss";

import { twPreset } from "./src/lib/twPreset";

const config = {
	presets: [twPreset],
	content: ["src/app/**/*.{ts,tsx}", "src/pages/**/*.{ts,tsx}", "src/components/**/*.{ts,tsx}"],
} satisfies Config;

export default config;

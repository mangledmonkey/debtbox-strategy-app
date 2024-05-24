// import colors from "tailwindcss/colors";
import svelteUx from "svelte-ux/plugins/tailwind";

/** @type {import('tailwindcss').Config}*/
const config = {
    content: [
        "./src/**/*.{html,js,svelte,ts}",
        "./node_modules/svelte-ux/**/*.{svelte,js}",
        "./node_modules/layerchart/**/*.{svelte,js}",
    ],
    safelist: [
        {
            pattern: /(bg|text)-(red|green|blue|yellow)-.*/,
        },
        {
            pattern: /w-.*/,
        },
    ],
    theme: {
        extend: {
            flex: {
                "2": "2 2 0%",
            },
        },
    },
    ux: {
        // See customization docs
        themes: {
            //   light: {
            // 	primary: colors['orange']['500'],
            // 	'primary-content': 'white',
            // 	secondary: colors['blue']['500'],
            // 	'surface-100': 'white',
            // 	'surface-200': colors['gray']['100'],
            // 	'surface-300': colors['gray']['300'],
            // 	'surface-content': colors['gray']['900'],
            // 	'color-scheme': 'light'
            //   },
            //   dark: {
            // 	primary: colors['orange']['500'],
            // 	'primary-content': 'white',
            // 	secondary: colors['blue']['500'],
            // 	'surface-100': colors['zinc']['800'],
            // 	'surface-200': colors['zinc']['900'],
            // 	'surface-300': colors['zinc']['950'],
            // 	'surface-content': colors['zinc']['100'],
            // 	'color-scheme': 'dark'
            //   },
            light: {
                "color-scheme": "light",
                primary: "oklch(55.0% 0.22 255.75)", // Modern blue
                secondary: "oklch(75.0% 0.30 40.0)", // Vibrant orange
                "secondary-content": "oklch(97.0% 0.015 40.0)", // Adjusted for better contrast with orange
                accent: "oklch(75.0% 0.18 190.0)", // Cohesive accent color
                neutral: "#2D3748", // Darker neutral for better contrast
                "neutral-content": "#E2E8F0", // Lighter neutral content for readability
                "surface-100": "oklch(100% 0 0)",
                "surface-200": "#F7FAFC", // Lighter surface color for a cleaner look
                "surface-300": "#EDF2F7", // Updated to match the lighter surface-200
                "surface-content": "#2D3748", // Adjusted for better readability
            },
            dark: {
                "color-scheme": "dark",
                primary: "oklch(60.0% 0.2 255.75)", // Updated for better visibility
                secondary: "oklch(70.0% 0.25 40.0)", // Vibrant orange for better contrast
                accent: "oklch(70.0% 0.16 190.0)", // Cohesive accent color
                neutral: "oklch(31.38% 0.0211 254.1392)", // Slightly darker for better contrast
                "neutral-content": "#E2E8F0", // Lighter for readability
                "surface-100": "#121212", // Darker surface for better contrast
                "surface-200": "#181818", // Updated for a smooth gradient
                "surface-300": "#1F1F1F", // Adjusted for better consistency
                "surface-content": "#CBD5E0", // Lighter for readability
            },
            fontSize: {
				'xs': ['clamp(0.75rem, 1vw, 0.875rem)', { lineHeight: '1rem' }], // 12px to 14px
				'sm': ['clamp(0.875rem, 1vw, 1rem)', { lineHeight: '1.25rem' }], // 14px to 16px
				'base': ['clamp(1rem, 1.2vw, 1.125rem)', { lineHeight: '1.5rem' }], // 16px to 18px
				'lg': ['clamp(1.125rem, 1.4vw, 1.25rem)', { lineHeight: '1.75rem' }], // 18px to 20px
				'xl': ['clamp(1.25rem, 1.6vw, 1.5rem)', { lineHeight: '1.75rem' }], // 20px to 24px
				'2xl': ['clamp(1.5rem, 2vw, 1.75rem)', { lineHeight: '2rem' }], // 24px to 28px
				'3xl': ['clamp(1.875rem, 2.4vw, 2.25rem)', { lineHeight: '2.25rem' }], // 30px to 36px
				'4xl': ['clamp(2.25rem, 2.8vw, 3rem)', { lineHeight: '2.5rem' }], // 36px to 48px
				'5xl': ['clamp(3rem, 3.2vw, 3.75rem)', { lineHeight: '1' }], // 48px to 60px
				'6xl': ['clamp(3.75rem, 4vw, 4.5rem)', { lineHeight: '1' }], // 60px to 72px
				'7xl': ['clamp(4.5rem, 4.8vw, 5.25rem)', { lineHeight: '1' }], // 72px to 84px
				'8xl': ['clamp(6rem, 6vw, 6.75rem)', { lineHeight: '1' }], // 96px to 108px
				'9xl': ['clamp(8rem, 8vw, 9rem)', { lineHeight: '1' }] // 128px to 144px
			   },
        },
    },
    plugins: [
        svelteUx, // Can also call with colorSpace options
    ],
};

module.exports = config;

import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import containerQueries from '@tailwindcss/container-queries'

const config: Config = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				mono: ['Roboto Mono', ...defaultTheme.fontFamily.mono]
			},
			height: {
				'with-caret': '1.2em'
			},
			width: {
				page: 'min(100%,56rem);'
			},
			padding: {
				page: '1rem'
			},
			boxShadow: {
				bottom: '0 2px 4px -4px rgba(0 0 0 / 0.1)'
			}
		}
	},
	plugins: [containerQueries]
}

export default config

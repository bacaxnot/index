import { defineConfig } from 'astro/config'

import tailwind from '@astrojs/tailwind'
import vercel from '@astrojs/vercel/serverless'

// https://astro.build/config
export default defineConfig({
	output: 'hybrid',
	site: 'https://blog.bacaxnot.com',
	image: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'ehgwwzsrzlymozphrlyk.supabase.co',
				port: '',
				pathname: '/storage/v1/object/public/images/**'
			}
		]
	},
	integrations: [tailwind(), vercel()]
})

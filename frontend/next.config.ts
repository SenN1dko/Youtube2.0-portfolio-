import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	/* config options here */
	reactStrictMode: true,
	poweredByHeader: false,
	images: {
    remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3001', // Порт твоего бэкенда
                pathname: '/**', // 🌟 РАЗРЕШАЕТ ВСЁ: /avatars, /thumbnails, /banners и т.д.
            },
			{
				protocol: 'https',
				hostname: 'api.dicebear.com',
				port: '',
				pathname: '/7.x/bottts/svg', 
			},
        ],
  },
	async rewrites() {
		return [
			
			{
				source: '/uploads/:path*',
				destination: `${process.env.SERVER_URL}/uploads/:path*`
			}
		]
	}
}

export default nextConfig

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

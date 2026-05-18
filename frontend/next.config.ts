import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	/* config options here */
	reactStrictMode: true,
	poweredByHeader: false,
	images: {
    remotePatterns: [
      {
        protocol: 'http', // ⚠️ Обрати внимание: для localhost обычно используется http, а не https
        hostname: 'localhost', // Разрешаем картинки с локального сервера
        port: '3000', // Указываем порт, на котором запущен твой бэкенд Elysia
        pathname: '/public/**', // Разрешаем доступ ко всем файлам внутри папки public бэкенда
      },
      {
        protocol: 'https',
        hostname: 'gaming-cdn.com',
        port: '',
        pathname: '/**',
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

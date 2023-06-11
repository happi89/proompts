import million from 'million/compiler';

/** @type {import('next').NextConfig} */
const nextConfig = {
  	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com',
				port: '',
				pathname: '/u/**',
			},
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
				port: '',
        pathname: '/**',
			}
		],
	},
	reactStrictMode: true
}

export default million.next(nextConfig)
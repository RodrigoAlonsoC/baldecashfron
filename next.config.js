/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        HOST_ENDPOINT: process.env.HOST_ENDPOINT,
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://192.168.0.5/:path*',
            },
        ]
    },
}

module.exports = nextConfig

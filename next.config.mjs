/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: "**",
            },
        ],
    },
    reactStrictMode: true,
    webpack(config, { dev }) {
        if (dev) {
            config.devtool = 'source-map';
        }
        return config;
    },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {

        formats: ['image/webp']
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

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: "3335"
            },
            {
                protocol: "http",
                hostname: "144.91.80.153",
                port: "3335"
            },
            {
                protocol: "http",
                hostname: "144.91.80.153",
                port: "9999"
            }
        ]
    }
};

export default nextConfig;

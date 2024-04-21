/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.blog.aleksipamilo.dev",
        pathname: "/uploads/*",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/*",
      }
    ],
  },
};

export default nextConfig;

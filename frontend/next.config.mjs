/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.blog.aleksipamilo.dev",
        pathname: "/uploads/*",
      }
    ],
  },
};

export default nextConfig;

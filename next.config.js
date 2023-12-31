//  @type {import('next').NextConfig}
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "user-images.githubusercontent.com",
      "localhost",
      "yatri-onn-time-storage.s3.ap-southeast-1.amazonaws.com",
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "http://ec2-52-207-129-114.compute-1.amazonaws.com:3100/api/:path*", // Proxy to Backend
      },
    ];
  },
};

module.exports = nextConfig;

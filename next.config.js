// next.config.js
import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(process.cwd(), 'src'); // 设置别名，将 @ 指向 src 目录
    return config;
  },
};

export default nextConfig;

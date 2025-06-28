import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 開発時は通常のNext.js、本番時は静的エクスポート
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  trailingSlash: process.env.NODE_ENV === 'production',
  images: {
    unoptimized: process.env.NODE_ENV === 'production'
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js'
      }
    }
  }
};

export default nextConfig;

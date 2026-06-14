const path = require('path');

/** @type {import('next').NextConfig} */
// Dual-deploy: STATIC_EXPORT=1 → GitHub Pages (static), otherwise → Vercel (full runtime)
const staticExport = process.env.STATIC_EXPORT === '1';

const nextConfig = {
  ...(staticExport ? { output: 'export' } : {}),
  outputFileTracingRoot: path.join(__dirname),
  trailingSlash: true,
  // basePath: '/OvercomersGlobalNetwork', // Commented out for custom domain
  allowedDevOrigins: ["*.preview.same-app.com"],
  images: {
    unoptimized: true,
    domains: [
      "source.unsplash.com",
      "images.unsplash.com",
      "ext.same-assets.com",
      "ugc.same-assets.com",
      "img.youtube.com",
      "media.redcircle.com",
      "media.npr.org",
      "www.gainesville.com",
      "thetbjoshuafanclub.wordpress.com",
      "d2xsxph8kpxj0f.cloudfront.net",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ext.same-assets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ugc.same-assets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "d2xsxph8kpxj0f.cloudfront.net",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;

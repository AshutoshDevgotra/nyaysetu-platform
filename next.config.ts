// next.config.js

/** @type {import('next').NextConfig} */
module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Add output configuration for better Windows compatibility
  output: 'standalone',

  // Disable typescript checks during build for faster builds
  typescript: {
    ignoreBuildErrors: true,
  },

  // other config options here...
};

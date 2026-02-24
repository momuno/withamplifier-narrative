/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for easy hosting
  output: 'export',
  
  // No image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // Load shaders as raw strings
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      type: 'asset/source',
    })
    return config
  },
}

module.exports = nextConfig

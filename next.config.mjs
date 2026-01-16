import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['c4.wallpaperflare.com','c1.wallpaperflare.com', 'img.freepik.com'], // Add wallpaperflare.com or any other image domains you plan to use
  },
};

export default withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
})(nextConfig);

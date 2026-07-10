/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // static export can't use Next's image optimization server;
                        // swap to a hosted loader (e.g. Cloudflare Images) later if you want it.
  },
  trailingSlash: true, // makes /work/index.html etc. so static hosts serve it without extra rewrites
};

module.exports = nextConfig;

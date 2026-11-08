import type { NextConfig } from "next";
import createMDX from '@next/mdx';
import path from 'path';

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  turbopack: {
    root: path.resolve(__dirname, '..'),
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

export default withMDX(nextConfig);

/* @type {import(‘next’).NextConfig} */
const repoName = 'website'; // Replace with your repo name
const nextConfig = {
    output: 'export',
    // If your site will be served from a subpath (not root domain):
    basePath: '/website',
    assetPrefix: '/website/',
};
module.exports = nextConfig;
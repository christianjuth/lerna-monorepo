/** @type {import('next').NextConfig} */
const path = require('path');
const fs = require('fs');


function getFilesInFolder(folder, prefix = '') {
  const pgkFolders = fs.readdirSync(folder).filter(pkg => !/^\./.test(pkg))
  return pgkFolders.map(pkg => `${prefix}${pkg}`)
}

const withTM = require('next-transpile-modules')([
  ...getFilesInFolder(
    path.join(__dirname, '../', '../',  'packages'),
    '@christianjuth/'
  ),
  ...getFilesInFolder(
    path.join(__dirname, '../', '../',  'react'),
    '@christianjuth/'
  ), 
]);

module.exports = withTM({
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    styledComponents: true
  }
});
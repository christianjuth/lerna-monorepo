/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')([
  '@christianjuth/tictactoe-engine',
  '@christianjuth/minimax',
  '@christianjuth/graph-search',
  '@christianjuth/genetics',
  '@christianjuth/sudoku-solver',
  '@christianjuth/game-of-life'
]);

module.exports = withTM({
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    styledComponents: true
  }
});
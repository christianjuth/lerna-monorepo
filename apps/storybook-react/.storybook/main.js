const path = require('path')
const fs = require('fs')

function getFilesInFolder(folder) {
  const pgkFolders = fs.readdirSync(folder).filter(pkg => !/^\./.test(pkg))
  return pgkFolders.map(file => path.join(folder, file))
}

function getPackagesMatcher(folders) {
  const internalPackages = folders.map(getFilesInFolder).flat()

  return (package) => {
    for (let internalPgk of internalPackages) {
      if (package.indexOf(internalPgk) === 0) {
        return true
      }
    }
    return false
  }
}

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    "storybook-dark-mode"
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "webpack5"
  },
  webpackFinal: async (config) => {

    const matcher = getPackagesMatcher([
      path.join(process.cwd(), '..', '..', 'internal-packages')
    ])

    config.module.rules.push({
      test: /\.+(ts|tsx)$/,
      type: 'javascript/auto',
      include: matcher,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ["react-app", {
              "runtime": "automatic"
            }]
          ]
        }
      }
    });

    return config;
  },
}
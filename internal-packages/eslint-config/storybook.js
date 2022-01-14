module.exports = {
  extends: [
    "plugin:storybook/recommended"
  ],
  overrides: [
    {
      "files": [
        "**/*.stories.*"
      ],
      "rules": {
        "import/no-anonymous-default-export": "off"
      }
    }
  ]
}
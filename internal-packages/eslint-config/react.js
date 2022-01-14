module.exports =  {
  extends:  [
    'plugin:react/recommended',
    "plugin:react-hooks/recommended",
  ],
  parserOptions:  {
    ecmaVersion:  2018,
    sourceType:  'module',
  },
  rules: {
    'react/prop-types': [
      1,
      {
        ignore: ['context', 'tracking'],
      },
    ],
    "prefer-const": "off",
    'react/prop-types': 'off',
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
  },
  settings: {
    "react": {
      "version": "detect",
    },
  }
};
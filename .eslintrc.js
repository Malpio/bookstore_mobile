module.exports = {
  "env": {
      "browser": true,
      "es2021": true
  },
  "extends": [
      "plugin:react/recommended",
      "plugin:@typescript-eslint/recommended",
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
      "ecmaFeatures": {
          "jsx": true
      },
      "ecmaVersion": 12,
      "sourceType": "module"
  },
  "plugins": [
      "react",
      "@typescript-eslint",
      "eslint-plugin-no-inline-styles"
  ],
  "rules": {
      '@typescript-eslint/explicit-function-return-type': [
          "off",
        {allowTypedFunctionExpressions: true},
      ],
      '@typescript-eslint/explicit-module-boundary-types': [
          "off",
      {allowTypedFunctionExpressions: true},
      ],
      "no-console": 'error',
      'react/prop-types': [
          "off",
      {allowTypedFunctionExpressions: true},
      ],
      "no-inline-styles/no-inline-styles": 1,
      '@typescript-eslint/no-empty-interface' : [ "off"]
  }
};

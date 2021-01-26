module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  "rules": {
    "quotes": ["error", "double"],
    'prettier/prettier': 0,
    "react-hooks/exhaustive-deps": 0,
  }
};

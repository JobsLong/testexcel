module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module'
  },
  // extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    'import/no-unresolved': 0,
    // 'semi': [2, 'never'],
    // 'comma-dangle': ['error', 'never'],
    // 'no-undef': ['error', { "typeof": true}],
    // 'prefer-arrow-callback': ["error", { "allowUnboundThis": true }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}

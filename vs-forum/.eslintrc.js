module.exports = {
  "root": true,
  "env": {
    "node": true
  },
  "extends": [
    "plugin:vue/vue3-essential",
    "eslint:recommended"
  ],
  "parserOptions": {
    "parser": "babel-eslint"
  },
  "rules": {
    "no-unused-vars": process.env.NODE_ENV == "production" ? "error" : "warn",
    "vue/no-unused-components": process.env.NODE_ENV == "production" ? "error" : "warn",
    "vue/no-parsing-error": process.env.NODE_ENV == "production" ? "error" : "warn",
  }
}
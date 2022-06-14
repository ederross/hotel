const I18NextHttpBackend = require("i18next-http-backend");

module.exports = {
  i18n: {
    defaultLocale: "us",
    locales: ["us"],

    backend: {
      loadPath: `https://d3tmwynvs73u9l.cloudfront.net/public/locales/{{lng}}/{{ns}}.json`,
    },
  },
  debug: true,
  ns: ["common"],
  serializeConfig: false,
  use: [I18NextHttpBackend],
};
